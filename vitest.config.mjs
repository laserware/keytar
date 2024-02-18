import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    cache: {
      dir: path.resolve(process.cwd(), "node_modules", ".vitest"),
    },
    environment: "happy-dom",
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
    },
  },
});
