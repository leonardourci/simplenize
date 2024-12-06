import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		fs: {
			allow: [
				'./static',
				'./src',
				'./node_modules'
			]
	}
	},
	plugins: [
		sveltekit(),
		Icons({ autoInstall: true })
	]
});
