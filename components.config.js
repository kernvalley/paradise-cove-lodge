/* eslint-env serviceworker */
import urlResolve from 'rollup-plugin-url-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'js/components.js',
	output: {
		file: 'js/components.min.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		urlResolve(),
		terser(),
	],
};
