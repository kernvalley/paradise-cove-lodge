import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
// import 'https://cdn.kernvalley.us/js/std-js/theme-cookie.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
// import 'https://cdn.kernvalley.us/components/install/prompt.js';
import 'https://cdn.kernvalley.us/components/weather/current.js';
import 'https://cdn.kernvalley.us/components/ad/block.js';
import {
	ready, loaded, toggleClass, on, addClass, attr, css, intersect,
} from 'https://cdn.kernvalley.us/js/std-js/dom.js';
import { debounce } from 'https://cdn.kernvalley.us/js/std-js/events.js';
import { prefersReducedMotion } from 'https://cdn.kernvalley.us/js/std-js/media-queries.js';
import {
	importGa, externalHandler, telHandler, mailtoHandler, geoHandler,
	genericHandler, send, hasGa
} from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';

toggleClass(document.documentElement, {
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
	'js': true,
	'no-js': false,
});

css(document.documentElement, { '--viewport-height': `${window.innerHeight}px`});

on(window, 'resize', debounce(() => {
	css(document.documentElement, { '--viewport-height': `${window.innerHeight}px`});
}), { passive: true });

if (typeof GA === 'string' && GA.length !== 0) {
	loaded().then(() => {
		requestIdleCallback(async () => {
			const { ga } = await importGa(GA);

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
		});
	});
}

ready().then(() =>{
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
