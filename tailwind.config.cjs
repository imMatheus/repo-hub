/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: '#0c1116',
                'bg-gray': '#161a22',
                text: '#f0f6fc',
                'text-gray': '#8b949e',
                primary: '#58a6ff',
            },
        },
    },
    plugins: [],
}
