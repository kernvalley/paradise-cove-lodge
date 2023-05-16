---
layout: null
---
'use strict';
/* eslint-env serviceworker */
/* eslint no-unused-vars: 0 */
const config = {
	version: '{{ site.version }}',
	fresh: [
		'{{ site.pages | where: "pinned", true | map: "url" | join: "', '" }}',
		'/webapp.webmanifest',
		'https://events.kernvalley.us/events.json',
	].map(path => new URL(path, location.origin).href),
	stale: [
		/* JS */
		'/js/index.min.js',
		'/js/components.min.js',
		'{{ site.data.importmap.imports["@shgysk8zer0/polyfills"] }}',
		'{{ site.data.importmap.imports["@shgysk8zer0/kazoo/"] }}harden.js',

		/* `customElements`, etc. */
		'{{ site.data.importmap.imports["@kernvalley/components/"] }}ad.js',
		// '{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}toast-message.html',
		// '{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}leaflet/map.html',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}github/user.html',
		// '{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}pwa/prompt.html',
		'{{ site.data.importmap.imports["@kernvalley/components/"] }}events.html',

		/* CSS */
		'/css/index.min.css',
		'{{ site.data.importmap.imports["@kernvalley/components/"] }}ad.css',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}github/user.css',
		// '{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}pwa/prompt.css',
		// '{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}toast-message.css',
		'{{ site.data.importmap.imports["@kernvalley/components/"] }}events.css',

		/* Images & Icons */
		'/img/icons.svg',
		'/img/apple-touch-icon.png',
		'/img/icon-192.png',
		'/img/favicon.svg',
		'https://cdn.kernvalley.us/img/adwaita-icons/actions/mail-send.svg',
		'https://cdn.kernvalley.us/img/adwaita-icons/actions/mark-location.svg',
		'https://cdn.kernvalley.us/img/octicons/file-media.svg',
		'https://cdn.kernvalley.us/img/logos/instagram.svg',
		'https://cdn.kernvalley.us/img/keep-kern-clean.svg',

		/* Fonts */
		'https://cdn.kernvalley.us/fonts/roboto.woff2',
		/* Other */
	].map(path => new URL(path, location.origin).href),
	allowed: [
		'/https://i.imgur.com/',
		/https:\/\/\w+\.githubusercontent\.com\/u\/*/,
		new URL('/img/', location.origin).href,
		new URL('/img/raster/', location.origin).href,
		/\.(png|jpg|webp|woff2)$/,
	],
	allowedFresh: [
		'https://api.github.com/users/',
		'https://api.openweathermap.org/data/2.5/weather',
		/\.(js|css|html|json)$/,
	]
};
