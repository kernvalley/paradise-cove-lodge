/* eslint-env node */
import urlResolve from 'rollup-plugin-url-resolve';
import terser from '@rollup/plugin-terser';
import { rollupImport } from '@shgysk8zer0/rollup-import';

const config = {
	input: 'js/components.js',
	output: {
		file: 'js/components.min.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		rollupImport(['_data/importmap.yaml']),
		urlResolve(),
		terser(),
	],
};
console.log(config);
export default config;
