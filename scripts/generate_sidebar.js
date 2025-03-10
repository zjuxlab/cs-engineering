const fs = require('fs');
const path = require('path');

// 配置文件路径
const DOCS_JSON_PATH = path.resolve(__dirname, '../dist/docs.json');
const OUTPUT_SIDEBAR_PATH = path.resolve(__dirname, '../sidebars.js');

// 安全目录名生成函数（需与文档处理逻辑完全一致）
// function createSafeDirName(title) {
//   return title
//     .normalize('NFKC')
//     // .toLowerCase()
//     .replace(/[^\p{L}\p{N}_-～]/gu, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
//     .substring(0, 50)
//     .replace(/^[-]+|[-]+$/g, '');
// }


function createSafeDirName(title) {
  return title
    .normalize('NFKC')
    .replace(/[^(\uFF08-\uFF09)()\w\u4e00-\u9fa5\s～-]/g, '')
    .replace(/[^\p{L}\p{N}_-～\uFF08\uFF09()]/gu, '') // Unicode属性转义
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50)
    .replace(/^[-]+|[-]+$/g, '');
}
/**
 * 模拟文档处理器生成路径的逻辑
 */
function processNodes(nodes, parentPath = '', suffixScope = 'hierarchy') {
  const counterMap = new Map();
  return nodes
  .filter(node => {
    // 需要排除的目录名称列表
    const excludeTitles = ['项目积累文档', '待清理的文档'];
    return !excludeTitles.includes(node.title);
  })
  .map(node => {
    const baseName = createSafeDirName(node.title);
    let dirName;

    // 处理同名节点后缀
    if (suffixScope === 'hierarchy') {
      const counterKey = `${parentPath}|${baseName}`;
      let count = counterMap.get(counterKey) || 0;
      dirName = count > 0 ? `${baseName}-${count}` : baseName;
      counterMap.set(counterKey, count + 1);
    } else {
      let count = counterMap.get(baseName) || 0;
      dirName = count > 0 ? `${baseName}-${count}` : baseName;
      counterMap.set(baseName, count + 1);
    }

    // 构建当前节点路径（统一使用正斜杠）
    const currentPath = parentPath ? `${parentPath}/${dirName}` : dirName;

    // 递归处理子节点
    const children = node.children 
      ? processNodes(node.children, currentPath, suffixScope)
      : [];

    // 如果节点有文件名，则将路径设置为包含文件名的路径
    const nodePath = node.filename ? `${currentPath}/${baseName}` : currentPath;

    return {
      ...node,
      _path: nodePath, // 添加路径元信息
      _children: children
    };
  });
}

/**
 * 生成Docusaurus侧边栏配置
 */
function generateSidebarItems(nodes) {
  return nodes.map(node => {
    // 基础配置
    const item = {
      label: node.title,
    };

    // 判断是否为分类节点
    const hasChildren = node._children && node._children.length > 0;
    
    if (hasChildren) {
      item.type = 'category';
      item.items = generateSidebarItems(node._children);
      // 如果本节点有对应文档，则添加链接
      if (node.filename) {
        item.link = { type: 'doc', id: node._path };
      }
    } else {
      item.type = 'doc';
      item.id = node._path;
    }

    return item;
  });
}

// 主流程
function main() {
  try {
    // 读取文档结构
    const docsTree = JSON.parse(fs.readFileSync(DOCS_JSON_PATH, 'utf-8'));
    
    // 处理节点生成路径
    const processedNodes = processNodes(docsTree);
    
    // 生成侧边栏配置
    const sidebarConfig = {
      sidebar: generateSidebarItems(processedNodes)
    };

    // 生成配置文件内容
    const configContent = `// 自动生成，请勿手动修改
module.exports = ${JSON.stringify(sidebarConfig, null, 2)};`;

    // 写入文件
    fs.writeFileSync(OUTPUT_SIDEBAR_PATH, configContent);
    
    console.log('✅ 侧边栏配置已生成至:', path.relative(process.cwd(), OUTPUT_SIDEBAR_PATH));
  } catch (error) {
    console.error('🚨 生成失败:', error);
    process.exit(1);
  }
}

// 执行
main();