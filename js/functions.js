import { loadImage } from 'https://cdn.kernvalley.us/js/std-js/loader.js';

export function updateImage(img, t = 15) {
	if (img instanceof HTMLImageElement) {
		const src = new URL(img.src);
		src.searchParams.set('ts', Date.now());

		loadImage(src.href, {
			crossOrigin: img.crossOrigin,
			referrerPolicy: img.referrerPolicy,
			width: img.width || img.naturalWidth,
			height: img.height || img.naturalHeight,
			classes: [...img.classList],
			alt: img.alt,
		}).then(updated => {
			requestAnimationFrame(() => {
				img.replaceWith(updated);
				setTimeout(() => updateImage(updated, t), t * 1000);
			});
		}).catch(console.error);
	} else {
		throw new Error('No lake cam image provided');
	}
}
