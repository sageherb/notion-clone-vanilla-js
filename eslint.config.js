import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
    },
  },
  eslintConfigPrettier,
];
