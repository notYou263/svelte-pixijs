import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
		//  'svelte-pixijs': path.resolve(__dirname, './src/lib'),
		//  '$lib-site': path.resolve(__dirname, './src/lib-site'),
		},
	  },
});
