module.exports = {
    extends: [
        // add more generic rule sets here, such as:
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
        "plugin:vue/vue3-recommended"
    ],
    rules: {
        // override/add rules settings here, such as:
        "vue/html-indent": [
            "error", 4, { // Allow the use of 4 spaces per indent rather than 2
                "attribute": 1,
                "baseIndent": 1,
                "closeBracket": 0,
                "alignAttributesVertically": true,
                "ignores": []
            }
        ]
    }
};