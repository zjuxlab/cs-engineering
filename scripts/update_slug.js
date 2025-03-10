// update-slugs.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { pinyin } = require('pinyin-pro');

// 配置参数
const DOCS_DIR = path.join(__dirname, '../docs'); // 文档根目录
const SIDEBAR_PATH = path.join(__dirname, '../sidebars.js'); // sidebar 配置文件

// 生成安全 slug 的辅助函数
const generateSlug = (chineseStr) => {
  // 转换为拼音
  const pinyinStr = pinyin(chineseStr, {
    toneType: 'none',
    type: 'array',
    nonZh: 'consecutive',
  }).join('-');

  // 移除特殊字符并标准化
  return pinyinStr
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// 递归遍历 sidebar 提取所有文档 ID
const collectDocIds = (sidebarItems) => {
  const ids = [];
  for (const item of sidebarItems) {
    if (item.type === 'doc') {
      ids.push(item.id);
    } else if (item.type === 'category' && item.items) {
      ids.push(...collectDocIds(item.items));
    }
  }
  return ids;
};

// 主处理函数
const processSlugs = async () => {
  try {
    // 读取 sidebar 配置
    const sidebar = require(SIDEBAR_PATH);
    const allDocIds = collectDocIds(sidebar.sidebar);

    // 处理每个文档
    for (const docId of allDocIds) {
      // 转换 ID 为文件路径
      const filePath = path.join(
        DOCS_DIR,
        `${docId.replace(/\//g, path.sep)}.md`
      );

      // 读取文件内容
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);

      // 生成新 slug（保留层级结构）
      const slugParts = docId.split('/').map(generateSlug);
      const newSlug = slugParts.join('/');

      // 更新 frontmatter
      frontmatter.slug = newSlug;

      // 处理多行 slug 语法
      const updatedContent = matter.stringify(content, frontmatter)
        .replace(/slug: >-\n\s+/g, 'slug: ')
        .replace(/\n{2,}/g, '\n\n');

      // 写入文件
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated: ${docId} -> slug: ${newSlug}`);
    }

    console.log('✅ All slugs updated successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

// 执行脚本
processSlugs();