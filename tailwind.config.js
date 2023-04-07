/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                ocGray: '#939191',
                error: '#FB2020',
                cardBg: '#F9F9F9',
            },
            fontFamily: {
                roboto: ['Roboto', 'sans serif'],
                poppins: ['Poppins', 'Roboto', 'sans serif'],
            },
        },
    },
    plugins: [],
};
