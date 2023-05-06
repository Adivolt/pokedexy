const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                bungee: ["Bungee", ...defaultTheme.fontFamily.sans],
                poppins: ["Poppins", ...defaultTheme.fontFamily.sans]
            }
        },
        backgroundImage: {
            "blue-conical-gradient": "conic-gradient(var(--tw-gradient-stops))"
        }
    },
    plugins: []
};
