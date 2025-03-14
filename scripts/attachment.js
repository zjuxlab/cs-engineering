const path = require('path');
const fse = require('fs-extra');
const globby = require('globby');

// 配置路径
const sourceAssets = path.join(__dirname, '../dist/docs/assets');
const targetAssets = path.join(__dirname, '../static/assets');
const docsPath = path.join(__dirname, '../docs');

// 1. 复制资源文件
async function copyAssets() {
  try {
    await fse.ensureDir(targetAssets);
    await fse.copy(sourceAssets, targetAssets);
    console.log(`资源已复制至 ${path.relative(process.cwd(), targetAssets)}`);
  } catch (err) {
    console.error('复制出错:', err);
  }
}

// 2. 处理Markdown文件
async function processMarkdownFiles() {
  try {
    const files = await globby('**/*.md', { 
      cwd: docsPath,
      ignore: ['**/node_modules/**']
    });

    await Promise.all(files.map(async (relativePath) => {
      const filePath = path.join(docsPath, relativePath);
      let content = await fse.readFile(filePath, 'utf8');

      // 使用更精确的正则表达式匹配<img>标签
      content = content.replace(
        /<img\s+src=["'](\/assets\/[^"']+)["'][^/>]*\/>/g,
        (match, srcPath) => {
          return `![](${srcPath})`;
        }
      );

      await fse.writeFile(filePath, content);
      console.log(`已处理: ${relativePath}`);
    }));

    console.log(`共处理 ${files.length} 个文件`);
  } catch (err) {
    console.error('处理失败:', err);
  }
}

// 执行任务
async function main() {
  await copyAssets();
  await processMarkdownFiles();
}

main();