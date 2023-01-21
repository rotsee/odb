module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@nuxtjs/eslint-config-typescript",
    "prettier",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": ["error", "always-multiline"],
    "vue/valid-v-slot": ["error", {
      // for data-table column slots
      "allowModifiers": true,
    }],
  },
}
