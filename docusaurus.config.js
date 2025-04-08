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

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en", "zh"], // 支持中文搜索
        docsRouteBasePath: "/",
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        searchResultLimits: 10, // 搜索结果数量限制
        searchResultContextMaxLength: 80, // 搜索结果上下文最大长度
        searchBarPosition: "right", // 搜索栏位置
        highlightSearchTermsOnTargetPage: true, // 在目标页面高亮搜索词
        // 自定义搜索栏样式可以在自定义CSS中定义
      }),
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
