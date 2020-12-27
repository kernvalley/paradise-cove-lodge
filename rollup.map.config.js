/* eslint-env serviceworker */
import urlResolve from 'rollup-plugin-url-resolve';
import {terser} from 'rollup-plugin-terser';

export default {
	input: 'js/map.js',
	output: {
		file: 'js/map.min.js',
		format: 'iife',
		sourcemap: true,
	},
	plugins: [
		urlResolve(),
		terser(),
	],
};
