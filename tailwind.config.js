/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
      "./blog/**/*.{js,jsx,ts,tsx,md,mdx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
    corePlugins: {
      preflight: false, // 禁用 Preflight 以避免覆盖 Docusaurus 默认样式
    },
    // 确保 Tailwind 不会与 Docusaurus 的样式冲突
    important: false,
  }