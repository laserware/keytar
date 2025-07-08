import { mock } from "bun:test";

import { GlobalRegistrator } from "@happy-dom/global-registrator";

mock.module("@laserware/arcade", () => ({
  isPlatform: (platform: string) => platform === "mac",
}));

GlobalRegistrator.register();
