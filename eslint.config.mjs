// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"
import prettierConfig from "eslint-config-prettier"

export default withNuxt(
  prettierConfig,
  {
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "comma-dangle": ["error", "always-multiline"],
      "vue/valid-v-slot": ["error", { allowModifiers: true }],
    },
  },
)
