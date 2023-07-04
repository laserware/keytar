import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    cache: {
      dir: path.resolve(process.cwd(), "node_modules", ".vitest"),
    },
    coverage: {
      provider: "istanbul",
      reporter: ["lcov"],
      exclude: [
        "**/__fakes__/**",
        "**/__mocks__/**",
        "**/__tests__/**",
        "**/__e2e__/**",
        "**/*.json",
        "**/*.js",
      ],
      // Include _all_ files in coverage, even untested ones:
      all: true,
      // Clean coverage results before running tests:
      clean: true,
    },
  },
});
