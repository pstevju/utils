import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: 'index',
		},
		sourcemap: true,
		minify: true,
	},
});
