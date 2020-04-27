import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import { ready, registerServiceWorker } from 'https://cdn.kernvalley.us/js/std-js/functions.js';
import { updateImage } from './functions.js';

if (document.documentElement.dataset.hasOwnProperty('serviceWorker')) {
	registerServiceWorker(document.documentElement.dataset.serviceWorker).catch(console.error);
}

document.documentElement.classList.replace('no-js', 'js');
document.documentElement.classList.toggle('no-dialog', document.createElement('dialog') instanceof HTMLUnknownElement);
document.documentElement.classList.toggle('no-details', document.createElement('details') instanceof HTMLUnknownElement);

ready().then(async () => {
	if (location.pathname.startsWith('/lakecam')) {
		updateImage(document.getElementById('lake-cam-img'), 15);
	}

	customElements.whenDefined('leaflet-map').then(() => {
		document.querySelectorAll('leaflet-map').forEach(el => el.hidden = false);
	});
});
