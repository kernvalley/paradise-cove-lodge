import { loadImage } from '@shgysk8zer0/kazoo/loader.js';
import { lakeimg } from './consts.js';
import {
	title as setTitle,
	description as setDescription,
	thumbnail as setThumbnail,
} from '@shgysk8zer0/kazoo/meta.js';

export function setMenuItemMeta() {
	if (location.hash.length === 37) {
		const target = document.getElementById(location.hash.substr(1));

		if (target instanceof HTMLElement && target.classList.contains('food-menuitem')) {
			const title = target.querySelector('[itemprop~="name"]').textContent;
			const description = target.querySelector('[itemprop~="description"]').textContent;
			const image = target.querySelector('[itemprop~="image"]').currentSrc;
			setTitle(`${title} | Paradise Cove Lodge`);
			setDescription(description);
			setThumbnail(image);
		}
	}
}

export function updateImage(img, t = 15) {
	if (img instanceof HTMLImageElement) {
		const src = new URL(img.src);
		src.searchParams.set(lakeimg.queryParam, Date.now());

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
		const { src, width, height, alt, loading, crossOrigin, referrerPolicy } = lakeimg;

		loadImage(src, { width, height, alt, loading, crossOrigin, referrerPolicy }).then(img => {
			document.querySelector(lakeimg.parentSelector).append(img);
			setTimeout(() => updateImage(img, t), t * 1000);
		}).catch(console.error);
	}
}
