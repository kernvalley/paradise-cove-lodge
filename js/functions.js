export function updateImage(img, t = 15) {
	if (img instanceof HTMLImageElement) {
		const image = new Image();
		image.crossOrigin = img.crossOrigin;
		image.alt = img.alt;
		image.id = img.id;
		image.className = img.className;

		image.addEventListener('load', ({ target }) => {
			requestAnimationFrame(() => {
				image.width = image.naturalWidth;
				image.height = image.naturalHeight;

				img.replaceWith(target);
				setTimeout(() => updateImage(target, t), t * 1000);
			});
		});

		image.addEventListener('error', console.error);

		const src = new URL(img.src);
		src.searchParams.set('ts', Date.now());
		image.src = src.href;
	} else {
		throw new Error('No lake cam image provided');
	}
}
