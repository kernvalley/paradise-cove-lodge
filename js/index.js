import { debounce } from '@shgysk8zer0/kazoo/events.js';
import { prefersReducedMotion } from '@shgysk8zer0/kazoo/media-queries.js';
import { createPolicy } from '@shgysk8zer0/kazoo/trust.js';
import { getGooglePolicy } from '@shgysk8zer0/kazoo/trust-policies.js';
import {
	importGa, externalHandler, telHandler, mailtoHandler, geoHandler,
	genericHandler, send, hasGa
} from '@shgysk8zer0/kazoo/google-analytics.js';
import {
	toggleClass, on, addClass, attr, css, intersect, interactive,
} from '@shgysk8zer0/kazoo/dom.js';
import { setMenuItemMeta } from './functions.js';
import { GA } from './consts.js';

toggleClass(document.documentElement, {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'js': true,
	'no-js': false,
});

if (! CSS.supports('height', '1dvh')) {
	css(document.documentElement, { '--viewport-height': `${window.innerHeight}px`});

	on(window, 'resize', debounce(() => {
		css(document.documentElement, { '--viewport-height': `${window.innerHeight}px`});
	}), { passive: true });
}

if (typeof GA === 'string' && GA.length !== 0) {
	const policy = getGooglePolicy();

	scheduler.postTask(async () => {
		const { ga } = await importGa(GA, {}, { policy });

		if (hasGa()) {
			ga('create', GA, 'auto');
			ga('set', 'transport', 'beacon');
			ga('send', 'pageview');

			on('a[rel~="external"]', 'click', externalHandler, { passive: true, capture: true });
			on('a[href^="tel:"]', 'click', telHandler, { passive: true, capture: true });
			on('a[href^="mailto:"]', 'click', mailtoHandler, { passive: true, capture: true });
			on('a[href^="geo:"]', 'click', geoHandler, { passive: true, capture: true });
			on('[data-event-category][data-event-label]', 'click', genericHandler, { passive: true, capture: true });
		}
	}, { priority: 'background' });
} else {
	// Still create it so that name is not available
	getGooglePolicy();
	createPolicy('goog#script-url', {});
	createPolicy('goog#html', {});
}

function init() {
	interactive().then(() =>{
		if (location.pathname.startsWith('/menu')) {
			const now = new Date();
			const day = now.getDay();
			const hour = now.getHours();

			/**
			* Sun, Wed, Thu, Fri, Sat
			* hours > 15 => starts @ 4:00 PM
			* hours < 20 => ends @ 8 PM
			*/
			if ([0, 3, 4, 5, 6].includes(day) && (hour > 15 && hour < 20)) {
				attr('#order-call-btn', { hidden: false });
			}

			if (('IntersectionObserver' in window) && ! prefersReducedMotion()) {
				const items = addClass('.food-menuitem', 'hidden');

				intersect(items, ({ isIntersecting, target }) => {
					if (isIntersecting) {
						target.animate([{
							transform: 'rotateX(-30deg) scale(0.85)',
							opacity: 0.3,
						}, {
							transform: 'none',
							opacity: 1,
						}], {
							duration: 300,
							easing: 'ease-in-out',
						});
					}

					target.classList.toggle('hidden', ! isIntersecting );
				});
			}

			setMenuItemMeta();

			globalThis.addEventListener('hashchange', setMenuItemMeta, { passive: true });
		} else if (location.pathname.startsWith('/contact')) {
			on('#contact-form', 'submit', ({ target }) => {
				attr('button', { disabled: true }, { base: target });
				attr('input', { readonly: true }, { base: target });

				if (hasGa()) {
					send({
						hitType: 'event',
						eventCategory: 'contact',
						eventAction: 'contact',
						eventLabel: 'contact',
						transport: 'beacon',
					});
				}
			}, {
				passive: true,
			});
		}
	});
}

init();

if ('navigation' in globalThis) {
	// Pretty sure all browsers supporting Navigation also support TrustedTypes
	const policy = trustedTypes.createPolicy('navigation#html', {
		createHTML(input) {
			return input;
		}
	});

	globalThis.navigation.addEventListener('navigate', event => {
		if (event.canIntercept) {
			event.intercept({
				async handler() {
					const resp = await fetch(event.destination.url, { signal: event.signal });

					if (resp.ok) {
						const html = await resp.text();
						const doc = Document.parseHTMLUnsafe(policy.createHTML(html));
						const replace = 'meta:not([charset]), link:not([rel="stylesheet"])';

						// Update `<head>`, keeping fixed things like scripts and stylesheets
						document.head.querySelectorAll(replace).forEach(el => el.remove());
						document.head.append(...doc.head.querySelectorAll(replace));
						document.title = doc.title;
						document.body.replaceChildren(...doc.body.childNodes);
						init();
						requestAnimationFrame(() => document.getElementById('main').scrollIntoView({ behavior: 'smooth' }));
					} else {
						throw new DOMException(`<${resp.url} [${resp.status}]>`, 'NetworkError');
					}
				}
			});
		}
	});
} else if ('trustedTypes' in globalThis) {
	trustedTypes.createPolicy('navigation#html', {
		input() {
			return trustedTypes.emptyHTML;
		}
	});
}
