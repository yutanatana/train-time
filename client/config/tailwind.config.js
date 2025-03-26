/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // jsx ファイルも含める
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1E3A8A', // アプリのメインカラーを設定
                secondary: '#10B981', // サブカラーを設定
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // 使用するフォントを設定
            },
        },
    },
    plugins: [],
};