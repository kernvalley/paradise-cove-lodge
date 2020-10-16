import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://unpkg.com/@webcomponents/custom-elements@1.4.2/custom-elements.min.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/leaflet/map.js';
import 'https://cdn.kernvalley.us/components/leaflet/marker.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/pwa/install.js';
import 'https://cdn.kernvalley.us/components/weather-current.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import { ready, $ } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { loadScript } from 'https://cdn.kernvalley.us/js/std-js/loader.js';
import { importGa, externalHandler, telHandler, mailtoHandler, geoHandler, genericHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';
import { updateImage, viewHandler } from './functions.js';

document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
document.documentElement.classList.replace('no-js', 'js');
document.documentElement.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
document.documentElement.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);

requestIdleCallback(() => {
	const $doc = $(document.documentElement);

	$doc.debounce('resize', () => $doc.css({'--viewport-height': `${window.innerHeight}px`}));

	if (typeof GA === 'string' && GA !== '') {
		importGa(GA).then(async () => {
			/* global ga */
			ga('create', GA, 'auto');
			ga('set', 'transport', 'beacon');
			ga('send', 'pageview');

			await ready();

			$('a[rel~="external"]').click(externalHandler, { passive: true, capture: true });
			$('a[href^="tel:"]').click(telHandler, { passive: true, capture: true });
			$('a[href^="mailto:"]').click(mailtoHandler, { passive: true, capture: true });
			$('a[href^="geo:"]').click(geoHandler, { passive: true, capture: true });
			$('[data-event-category][data-event-label]').click(genericHandler, { passive: true, capture: true });
		}).catch(console.error);
	}
});

Promise.allSettled([
	ready(),
	loadScript('https://cdn.polyfill.io/v3/polyfill.min.js'),
]).then(() =>{
	if (location.pathname.startsWith('/lakecam')) {
		updateImage(document.getElementById('lake-cam-img'), 15);
	} else if (location.pathname.startsWith('/menu')) {
		const now = new Date();
		const day = now.getDay();
		const hour = now.getHours();

		/**
		 * Sun, Wed, Thu, Fri, Sat
		 * hours > 15 => starts @ 4:00 PM
		 * hours < 20 => ends @ 8 PM
		 */
		if ([0, 3, 4, 5, 6].includes(day) && (hour > 15 && hour < 20)) {
			$('#order-call-btn').unhide();
		}

		if (('IntersectionObserver' in window) && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
			$('.food-menuitem').addClass('hidden').then($items => $items.each(viewHandler));
		}
	}

	customElements.whenDefined('leaflet-map').then(() => {
		$('leaflet-map').unhide();
	});
});
