"use strict";

module.exports = {
  extends: ["@laserware/eslint-config"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  ignorePatterns: ["*.js"],
  overrides: [
    {
      files: "*.test.ts",
      rules: {
        "import/no-named-as-default": "off"
      }
    }
  ]
};
