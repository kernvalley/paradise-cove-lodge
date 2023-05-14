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
		'https://unpkg.com/@shgysk8zer0/polyfills@0.0.5/all.min.js',
		'https://unpkg.com/@shgysk8zer0/kazoo@0.0.11/harden.js',

		/* `customElements`, etc. */
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/krv/ad.js',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/toast-message.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/leaflet/map.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/github/user.html',
		// 'https://unpkg.com/@shgysk8zer0/components@0.0.3/pwa/prompt.html',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/krv/events.html',

		/* CSS */
		'/css/index.min.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/krv/ad.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/github/user.css',
		// 'https://unpkg.com/@shgysk8zer0/components@0.0.3/pwa/prompt.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/toast-message.css',
		'https://unpkg.com/@shgysk8zer0/components@0.0.3/krv/events.css',

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
