// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CS-Engineering',
  tagline: '浙江大学启真交叉学科创新创业实验室',
  favicon: 'img/small-logo.svg',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/cs-engineering/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zjuxlab', // Usually your GitHub org/user name.
  projectName: 'cs-engineering.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // onBrokenLinks: 'throw', 权宜之计
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
    localeConfigs: {
      zh: {
        path: 'zh'  // 将中文路径映射到 /zh/ 目录下
      }
    }
  },

  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        // 基本配置
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        language: ["zh", "en"],

        maxSearchResults: 10,
        
        
        // 侧边栏索引配置
        indexDocSidebarParentCategories: 2, // 索引两级侧边栏父类别
        includeParentCategoriesInPageTitle: true, // 在页面标题中包含父类别
        
        // lunr 搜索引擎配置
        lunr: {
          // 中文分词的正则表达式
          tokenizerSeparator: /[\s\-\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]+/,
          // 相似度调整
          b: 0.75, // 文档长度重要性
          k1: 1.2, // 词频重要性
          // 搜索提升权重
          titleBoost: 5,
          contentBoost: 1,
          tagsBoost: 3,
          parentCategoriesBoost: 2,
        }
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          exclude: [
            // 使用glob模式排除目录
            '**/项目积累文档/**', 
            '**/待清理的文档/**',
            // 可添加更多排除规则
          ],
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
            const items = await defaultSidebarItemsGenerator(args);
            return items.map(item => {
              if (item.type === 'doc') {
                return {
                  ...item,
                  id: encodeURI(item.id) // 显式编码路径
                };
              }
              return item;
            });
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/algolia-ui.css'),
            require.resolve('./src/css/sidebar-custom.css'),
            require.resolve('./src/css/navbar-custom.css'),
            require.resolve('./src/css/search-local-custom.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/small-logo.jpg',
      navbar: {
        title: 'CS-Engineering',
        logo: {
          alt: 'My Site Logo',
          src: 'img/small-logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'sidebar',
            position: 'left',
            label: '知识空间',
          },
          {to: '/blog', label: '博客', position: 'left'},
          {
            href: 'https://github.com/zjuxlab/cs-engineering',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutoria',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/zjuxlab/cs-engineering',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 浙江大学启真交叉学科创新创业实验室, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'bash', 'c']
      },
    }),
};

module.exports = config;
