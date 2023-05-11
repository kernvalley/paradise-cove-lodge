/* eslint-env node */
import PostCSSImport from 'postcss-import';
import PostCSSURL from 'postcss-url';
import PostCSSImportURL from 'postcss-import-url';
import PostCSSPresetEnv from 'postcss-preset-env';
import PostCSSDiscardComments from 'postcss-discard-comments';
// import CSSNano from 'cssnano';
export default {
	map: { inline: false },
	plugins: [
		PostCSSImport(),
		PostCSSURL(),
		PostCSSImportURL(),
		PostCSSPresetEnv(),
		PostCSSDiscardComments(),
		// require('postcss-custom-properties'),
		// require('postcss-media-minmax'),
		// CSSNano(),
	]
};
