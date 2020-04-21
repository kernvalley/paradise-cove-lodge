'use strict';
/*eslint no-undef: 0*/
/* 2020-02-20T11:42 */
self.importScripts('/sw.config.js');

self.addEventListener('install', async event => {
	event.waitUntil((async () => {
		try {
			for (const key of await caches.keys()) {
				if (key !== 'user') {
					await caches.delete(key);
				}
			}

			const cache = await caches.open(config.version);
			await cache.addAll([...config.stale || [], ...config.fresh || []]);
		} catch (err) {
			console.error(err);
		}
	})());
});

self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('fetch', event => {
	if (event.request.method === 'GET') {
		event.respondWith((async () => {
			const url = new URL(event.request.url);
			url.hash = '';

			if (Array.isArray(config.stale) && config.stale.includes(url.href)) {
				const cached = await caches.match(url);
				if (cached instanceof Response) {
					return cached;
				}
			} else if (Array.isArray(config.fresh) && config.fresh.includes(url.href)) {
				if (navigator.onLine) {
					const resp = await fetch(url.href);
					const cache = await caches.open(config.version);

					if (resp.ok) {
						cache.put(event.request, resp.clone());
					}
					return resp;
				} else {
					return caches.match(event.request.url);
				}
			} else if (Array.isArray(config.allowed) && config.allowed.some(entry => (
				entry instanceof RegExp
					? entry.test(event.request.url)
					: url.host === entry
			))) {
				const resp = await caches.match(event.request.url);

				if (resp instanceof Response) {
					return resp;
				} else if (navigator.onLine) {
					if (event.request.headers.has('Referer')) {
						event.request.remove('Referer');
					}
					const resp = await fetch(event.request.url, {
						cache: event.request.cache,
						credentials: event.request.credentials,
						headers: event.request.headers,
						integrity: event.request.integrity,
						method: event.request.method,
						mode: event.request.mode,
						redirect: event.request.redirect,
						referrer: event.request.referrer,
						referrerPolicy: event.request.referrerPolicy,

					});

					if (resp instanceof Response) {
						if (resp.ok) {
							const cache = await caches.open(config.version);
							cache.put(event.request.url, resp.clone());
						}
						return resp;
					} else {
						console.error(`Failed in request for ${event.request.url}`);
					}
				} else {
					console.error('Offline');
				}
			} else {
				return fetch(event.request);
			}
		})());
	}
});

self.addEventListener('error', console.error);
