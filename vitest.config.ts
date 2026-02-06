import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig(
	getViteConfig({
		test: {
			globals: true,
			environment: 'happy-dom',
			setupFiles: ['./vitest.setup.ts'],
			include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
			coverage: {
				provider: 'v8',
				reporter: ['text', 'html', 'json'],
				exclude: [
					'node_modules/',
					'dist/',
					'.astro/',
					'**/*.config.{js,ts}',
					'**/*.d.ts',
				],
			},
		},
	}),
);
