/* eslint-env serviceworker */
import urlResolve from 'rollup-plugin-url-resolve';
import { terser } from 'rollup-plugin-terser';
import { rollupImport } from '@shgysk8zer0/rollup-import';

export default {
	input: 'js/components.js',
	output: {
		file: 'js/components.min.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		rollupImport(['_data/imports.json']),
		urlResolve(),
		terser(),
	],
};
