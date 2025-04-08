const fs = require('fs');
const path = require('path');

// 文件路径
const backendFilePath = path.join(__dirname, '..', 'docs', '软件工程技能树', '后端技术', '后端技术.md');
const frontendFilePath = path.join(__dirname, '..', 'docs', '软件工程技能树', '前端技术', '前端技术.md');

// 后端技术内容
const backendContent = `
## 常用框架与平台

import TechCardGrid from '../../../src/components/TechCard/TechCardGrid';
import SpringIcon from '@site/static/img/subjects/spring.svg';
import NodeIcon from '@site/static/img/subjects/nodejs.svg';
import NestIcon from '@site/static/img/subjects/nestjs.png';
import DjangoIcon from '@site/static/img/subjects/django-logo.svg';
import GoIcon from '@site/static/img/subjects/go.svg';
import GraphQLIcon from '@site/static/img/subjects/graphql.svg';

<TechCardGrid 
  cards={[
    {
      title: 'Spring',
      description: 'Spring框架是一个开放源代码的J2EE应用程序框架',
      icon: SpringIcon,
      link: '/软件工程技能树/后端技术/开发语言/Java/Springboot/Springboot'
    },
    {
      title: 'Node.js',
      description: 'Node.js是一个基于Chrome V8引擎的JavaScript运行环境',
      icon: NodeIcon,
      link: '/软件工程技能树/后端技术/开发语言/NodeJS/NodeJS'
    },
    {
      title: 'Django',
      description: 'Django是一个高级Python Web框架，鼓励快速开发和清洁实用的设计',
      icon: DjangoIcon,
      link: '/软件工程技能树/后端技术/开发语言/Python/Django/Django'
    },
    {
      title: 'NestJS',
      description: '基于Node.js的渐进式框架，支持TypeScript',
      icon: NestIcon,
      link: '/软件工程技能树/后端技术/开发语言/NodeJS/NestJS'
    },
    {
      title: 'Gin',
      description: 'Golang的HTTP Web框架，高性能且轻量级',
      icon: GoIcon,
      link: '/软件工程技能树/后端技术/开发语言/Golang/web引擎/Gin/Gin'
    },
    {
      title: 'GraphQL',
      description: 'API查询语言和运行时，用于执行查询',
      icon: GraphQLIcon,
      link: '/软件工程技能树/后端技术/常见场景/API制定/GraphQL/GraphQL'
    }
  ]}
/>
`;

// 前端技术内容
const frontendContent = `
import TechCardGrid from '../../../src/components/TechCard/TechCardGrid';
import ReactIcon from '@site/static/img/subjects/react.svg';
import VueIcon from '@site/static/img/subjects/vue.svg';
import TSIcon from '@site/static/img/subjects/typescript-icon.svg';
import TailwindIcon from '@site/static/img/subjects/tailwindcss-icon.svg';
import JSIcon from '@site/static/img/subjects/javascript.svg';
import HTMLIcon from '@site/static/img/subjects/html-5.svg';
import CSSIcon from '@site/static/img/subjects/css-3.svg';
import ReduxIcon from '@site/static/img/subjects/redux.svg';
import ReactNativeIcon from '@site/static/img/subjects/redux.svg';
import ViteIcon from '@site/static/img/subjects/vite.svg';

## 核心技术

前端开发的基础构建块：

<TechCardGrid 
  cards={[
    {
      title: 'HTML',
      description: '构建网页内容的标记语言，定义页面结构',
      icon: HTMLIcon,
      link: '/软件工程技能树/前端技术/前端三件套/HTML/HTML'
    },
    {
      title: 'CSS',
      description: '样式表语言，负责网页的视觉呈现和布局',
      icon: CSSIcon,
      link: '/软件工程技能树/前端技术/前端三件套/CSS/CSS'
    },
    {
      title: 'JavaScript',
      description: '为网页添加交互功能的编程语言',
      icon: JSIcon,
      link: '/软件工程技能树/前端技术/前端三件套/JavaScript/JavaScript'
    }
  ]}
/>

## 流行框架与工具

现代前端开发依赖这些强大的框架和工具：

<TechCardGrid 
  cards={[
    {
      title: 'React',
      description: 'Facebook开发的JavaScript库，用于构建用户界面',
      icon: ReactIcon,
      link: '/软件工程技能树/前端技术/框架入门/React/React'
    },
    {
      title: 'Vue',
      description: '渐进式JavaScript框架，用于构建用户界面',
      icon: VueIcon,
      link: '/软件工程技能树/前端技术/框架入门/Vue/Vue'
    },
    {
      title: 'Tailwind CSS',
      description: '功能类优先的CSS框架，用于快速UI开发',
      icon: TailwindIcon,
      link: '/软件工程技能树/前端技术/前端三件套/CSS/CSS拓展/TailwindCSS/TailwindCSS'
    },
    {
      title: 'TypeScript',
      description: 'JavaScript的超集，添加了类型系统',
      icon: TSIcon,
      link: '/软件工程技能树/前端技术/开发语言/Typescript/Typescript'
    },
    {
      title: 'Vite',
      description: '下一代前端构建工具，显著提升开发体验',
      icon: ViteIcon,
      link: '/软件工程技能树/前端技术/框架入门/Vue/功能框架/Vite/Vite'
    },
    {
      title: 'Redux',
      description: 'JavaScript应用的状态容器',
      icon: ReduxIcon,
      link: '/软件工程技能树/前端技术/框架入门/React/功能框架/Redux/Redux'
    }
  ]}
/>
`;

// 用于检查文件是否已包含内容的函数
function hasContent(fileContent, contentToCheck) {
  // 简单检查：查找内容中的一些独特标记
  const uniqueMarkers = [
    'cards={[',
    'title: \'Spring\'',
    'title: \'React\''
  ];
  
  // 对于后端内容检查
  if (contentToCheck.includes('title: \'Spring\'')) {
    return uniqueMarkers.slice(0, 2).some(marker => fileContent.includes(marker));
  }
  
  // 对于前端内容检查
  if (contentToCheck.includes('title: \'React\'')) {
    return uniqueMarkers.slice(0, 1).concat(uniqueMarkers[2]).some(marker => fileContent.includes(marker));
  }
  
  return false;
}

// 处理后端文件
fs.readFile(backendFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取后端文件失败:', err);
    return;
  }

  // 检查文件是否已包含内容
  if (hasContent(data, backendContent)) {
    console.log('后端文件已经包含所需内容，跳过添加');
    return;
  }

  // 将内容追加到文件末尾
  const updatedContent = data + '\n\n' + backendContent;

  // 写入更新后的内容
  fs.writeFile(backendFilePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('写入后端文件失败:', err);
      return;
    }
    console.log('内容已成功添加到后端文件中');
  });
});

// 处理前端文件
fs.readFile(frontendFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('读取前端文件失败:', err);
    return;
  }

  // 检查文件是否已包含内容
  if (hasContent(data, frontendContent)) {
    console.log('前端文件已经包含所需内容，跳过添加');
    return;
  }

  // 将内容追加到文件末尾
  const updatedContent = data + '\n\n' + frontendContent;

  // 写入更新后的内容
  fs.writeFile(frontendFilePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('写入前端文件失败:', err);
      return;
    }
    console.log('内容已成功添加到前端文件中');
  });
});