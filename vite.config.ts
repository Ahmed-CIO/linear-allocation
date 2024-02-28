import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// By default, Vite doesn't include shims for NodeJS/
		// necessary for segment analytics lib to work
		global: {}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
