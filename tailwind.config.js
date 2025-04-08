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
      preflight: false, // ���� Preflight �Ա��⸲�� Docusaurus Ĭ����ʽ
    },
    // ȷ�� Tailwind ������ Docusaurus ����ʽ��ͻ
    important: false,
  }