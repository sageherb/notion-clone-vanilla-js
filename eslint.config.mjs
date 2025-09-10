import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      import: require("eslint-plugin-import"),
    },
    extends: [js.configs.recommended, eslintConfigPrettier, "plugin:import/recommended"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".mjs", ".cjs"],
        },
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": ["error", { destructuring: "all" }],
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      curly: ["error", "multi-line"],
      "object-shorthand": ["warn", "always"],
      "dot-notation": "warn",
      "prefer-template": "warn",
      "import/no-unresolved": "error",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);
