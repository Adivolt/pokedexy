const defaultTheme = require("tailwindcss/defaultTheme");
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'


export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                bungee: ["Bungee", ...defaultTheme.fontFamily.sans],
                poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
                noto: ["Noto Sans JP", ...defaultTheme.fontFamily.sans]
            }
        },
        backgroundImage: {
            "blue-conical-gradient": "conic-gradient(var(--tw-gradient-stops))"
        }
    },
    plugins: [
        forms,
        typography
    ]
};
