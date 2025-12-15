/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#36e27b",
                "background-light": "#f6f8f7",
                "background-dark": "#111714",
                "surface-dark": "#1d2520",
                "surface-light": "#ffffff",
            },
            fontFamily: {
                "display": ["Spline Sans", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
