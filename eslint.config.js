import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";

export default defineConfig([
  {
    ignores: ["node_modules", "dist", ".vite", "coverage"],
  },

  // JS
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      import: pluginImport,
    },
    extends: [
      js.configs.recommended,
      "plugin:import/recommended",
      // 포맷 충돌 제거 (ESLint는 품질, Prettier는 포맷)
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        vite: true,
        node: true,
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
    },
  },

  // TS
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: pluginImport,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        typescript: { project: true },
        vite: true,
        node: true,
      },
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
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
      "import/no-unresolved": "off",
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-floating-promises": "error",
    },
    extends: [eslintConfigPrettier],
  },

  {
    files: [
      "**/{vite,eslint,stylelint}.config.{js,cjs,mjs,ts}",
      "**/*.config.{js,cjs,mjs,ts}",
      "scripts/**/*.{js,ts}",
    ],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
    rules: {},
  },
]);
