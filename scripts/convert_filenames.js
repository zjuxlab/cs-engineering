const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const matter = require('gray-matter');


// 异步方法增强
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const rm = promisify(fs.rm);

// 配置路径
const RAW_DOCS_DIR = path.resolve(__dirname, '../dist/docs');
const OUTPUT_DIR = path.resolve(__dirname, '../docs');
const DOCS_JSON = path.resolve(__dirname, '../dist/docs.json');

// 增强版路径安全处理
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

// 文档节点处理器
class DocProcessor {
    constructor(options = {}) {
        this.options = {
          enableSuffix: true,
          suffixScope: 'hierarchy', // hierarchy | global
          ...options
        };
        this.nodeCounter = new Map();
    }

    generateUniqueDirName(node, parentPath) {
        const baseName = createSafeDirName(node.title);
        if (!this.options.enableSuffix) return baseName;

        // 根据作用域生成计数器键
        const counterKey = this.options.suffixScope === 'hierarchy'
          ? `${parentPath}|${baseName}`  // 层级作用域：父路径+名称
          : baseName;                   // 全局作用域：仅名称

        const counter = this.nodeCounter.get(counterKey) || 0;
        const uniqueName = counter > 0 ? `${baseName}-${counter}` : baseName;

        // 更新计数器
        this.nodeCounter.set(counterKey, counter + 1);
        return uniqueName;
    }

    async processNode(node, parentPath = '') {
        // 防御性类型检查
        if (!node || typeof node !== 'object') {
            throw new Error(`无效节点格式: ${JSON.stringify(node)}`);
        }

        // 必需字段验证
        if (typeof node.title !== 'string') {
            throw new Error(`节点缺少标题: ${node.node_token}`);
        }
        if (!node.node_token) {
            throw new Error(`节点缺少token: ${node.title}`);
        }

        try {
            // 生成安全目录名（包含父路径信息）
            const dirName = this.generateUniqueDirName(node, parentPath);
            const currentPath = path.join(parentPath, dirName);

            // 文件处理逻辑
            if (node.filename) {
                await this.handleFile(node, currentPath);
            }

            // 子节点处理
            if (node.children && node.children.length > 0) {
                await this.handleChildren(node, currentPath);
            }

            return { path: currentPath, node };
        } catch (error) {
            console.error(`处理节点失败 [${node.node_token}] ${node.title}`, error);
            throw error;
        }
    }

    async handleFile(node, currentPath) {
        // 统一路径分隔符
        const sourceFile = path.join(
            RAW_DOCS_DIR,
            node.filename.replace(/\\/g, path.sep)
        );
        if (!fs.existsSync(sourceFile)) {
            throw new Error(`源文件不存在: ${sourceFile}`);
        }

        const targetDir = path.join(OUTPUT_DIR, currentPath);
        const targetFile = path.join(targetDir, `${createSafeDirName(node.title)}.md`);
        // 读取原始文件内容
        const rawContent = fs.readFileSync(sourceFile, 'utf-8');
        const { data: frontmatter, content } = matter(rawContent);

        // 智能处理slug
        const processedSlug = this.processSlug(
            frontmatter.slug || '', 
            node.node_token
        );

        // 构建新frontmatter（保留其他元数据）
        const newFrontmatter = {
            ...frontmatter,
            slug: processedSlug,
            title: frontmatter.title || node.title, // 保留文件中的title
            sidebar_position: frontmatter.sidebar_position ?? node.position
        };

        // 生成新内容
        const newContent = matter.stringify(content, newFrontmatter);

        await mkdir(targetDir, { recursive: true });
        await fs.promises.writeFile(targetFile, newContent, 'utf-8');
        console.log(`📄 文件复制成功 [${node.node_token}] 
        源路径: ${path.relative(RAW_DOCS_DIR, sourceFile)}
        目标路径: ${path.relative(OUTPUT_DIR, targetFile)}`);
    }

    processSlug(originalSlug, nodeToken) {
        // 清理步骤
        return originalSlug
            .replace(/\\/g, '-')     // 替换反斜杠
            .replace(/[^\w-]/g, '')  // 移除非字母数字字符
            .replace(/-+/g, '-')     // 合并连续短横线
            .replace(/^-|-$/g, '')   // 去除首尾短横线
            .concat(`-${nodeToken.slice(0, 6)}`) // 使用token前6位作为短后缀
            .toLowerCase();          // 统一为小写
    }

    async handleChildren(node, currentPath) {
        // 按position字段排序
        const sortedChildren = [...node.children].sort((a, b) =>
            (a.position ?? 0) - (b.position ?? 0)
        );

        await Promise.all(
            sortedChildren.map(child =>
                this.processNode(child, currentPath)
            )
        );
    }
}

// 主流程
async function main() {
    try {
        // 读取并验证文档树
        const docsTree = JSON.parse(fs.readFileSync(DOCS_JSON, 'utf-8'));
        if (!Array.isArray(docsTree)) {
            throw new Error('文档根节点必须是数组');
        }

        // 清理输出目录
        if (fs.existsSync(OUTPUT_DIR)) {
            await rm(OUTPUT_DIR, { recursive: true, force: true });
        }
        await mkdir(OUTPUT_DIR, { recursive: true });

        // 拷贝 intro.md 文件到输出目录
        const introSource = path.resolve(__dirname, '../intro.md');
        const introTarget = path.resolve(OUTPUT_DIR, 'intro.md');
        if (fs.existsSync(introSource)) {
            await copyFile(introSource, introTarget);
            console.log(`📄 拷贝 intro.md 到输出目录成功`);
        } else {
            console.warn(`⚠️ intro.md 源文件不存在，跳过拷贝`);
        }

        // 初始化处理器
        const processor = new DocProcessor();

        // 按position排序根节点
        const sortedRoots = docsTree.sort((a, b) =>
            (a.position ?? 0) - (b.position ?? 0)
        );

        // 处理所有节点
        console.time('文档处理完成');
        await Promise.all(
            sortedRoots.map(root => processor.processNode(root))
        );
        console.timeEnd('文档处理完成');

        console.log(`✅ 成功生成文档结构至: ${path.relative(process.cwd(), OUTPUT_DIR)}`);
    } catch (error) {
        console.error('🚨 主流程失败:', error);
        process.exit(1);
    }
}

// 执行入口
main();