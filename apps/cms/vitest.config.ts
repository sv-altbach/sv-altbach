import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		fileParallelism: false,
		hookTimeout: 120_000,
		setupFiles: ["./src/test-env.ts"],
		testTimeout: 60_000,
	},
});
