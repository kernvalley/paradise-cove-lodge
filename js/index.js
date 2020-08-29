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
import { ready, $ } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { loadScript } from 'https://cdn.kernvalley.us/js/std-js/loader.js';
import { importGa } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { updateImage } from './functions.js';
import { GA } from './consts.js';

const $doc = $(document.documentElement);

$doc.replaceClass('no-js', 'js');
$doc.toggleClass('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
$doc.toggleClass('no-details', document.createElement('details') instanceof HTMLUnknownElement);

if (typeof GA === 'string' && GA !== '') {
	importGa(GA).then(async () => {
		/* global ga */
		ga('create', GA, 'auto');
		ga('set', 'transport', 'beacon');
		ga('send', 'pageview');


		function outbound() {
			ga('send', {
				hitType: 'event',
				eventCategory: 'outbound',
				eventAction: 'click',
				eventLabel: this.href,
				transport: 'beacon',
			});
		}

		function madeCall() {
			ga('send', {
				hitType: 'event',
				eventCategory: 'call',
				eventLabel: 'Called',
				transport: 'beacon',
			});
		}

		await ready();

		$('a[rel~="external"]').click(outbound, { passive: true, capture: true });
		$('a[href^="tel:"]').click(madeCall, { passive: true, capture: true });
	}).catch(console.error);
}

$doc.css({'--viewport-height': `${window.innerHeight}px`});
$doc.debounce('resize', () => $doc.css({'--viewport-height': `${window.innerHeight}px`}));

Promise.all([ready(), loadScript('https://cdn.polyfill.io/v3/polyfill.min.js')]).then(() =>{
	if (location.pathname.startsWith('/lakecam')) {
		updateImage(document.getElementById('lake-cam-img'), 15);
	}

	customElements.whenDefined('leaflet-map').then(() => {
		$('leaflet-map').unhide();
	});
});
