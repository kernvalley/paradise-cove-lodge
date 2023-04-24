/* eslint-env node */
module.exports = {
	map: { inline: false },
	plugins: [
		require('postcss-import'),
		require('postcss-url'),
		require('postcss-import-url'),
		require('postcss-preset-env')({
			features: {
				'focus-within-pseudo-class': false,
			}
		}),
		require('postcss-discard-comments'),
		require('postcss-custom-properties'),
		require('postcss-media-minmax'),
		require('cssnano'),
	]
};
