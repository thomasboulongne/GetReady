import marked from './Markdown';
import CookiesServ from 'cookie';
import CookiesClient from 'js-cookie';
import acceptLanguage from 'accept-language';

import { contentfulClient } from './ContentfulConfig';

export const getPages = function(Store, locale) {
	return new Promise(resolve => {
		contentfulClient.getEntries({
			content_type: '',
			locale: locale
		})
		.then(response => {
			response.items.forEach(item => {
				const page = item.fields;
				page.body = marked(page.body);
				Store.dispatch('addPage', page);
			});
			resolve();
		});
	});
};

export const getTranslations = function(Store, locale) {
	return new Promise(resolve => {
		contentfulClient.getEntries({
			content_type: 'translation',
			locale: locale
		})
		.then(response => {
			response.items.forEach(item => {
				Store.dispatch('addTranslation', item.fields);
			});
			resolve();
		});
	});
};

export const getAll = function(store, isServer, req, res) {
	let locale = 'en-US';

	if (isServer) {
		if (req) {
			acceptLanguage.languages(['en-US', 'fr-FR']);
			locale = acceptLanguage.get(req.headers['accept-language']);

			if (req.headers.cookie) {
				const cookies = CookiesServ.parse(req.headers.cookie);

				if (cookies[process.env.SLUG + '_locale']) {
					locale = cookies[process.env.SLUG + '_locale'];
				}
			}

			res.setHeader('Set-Cookie', CookiesServ.serialize(process.env.SLUG + '_locale', locale));
		}
	} else {
		locale = CookiesClient.get(process.env.SLUG + '_lang') ? CookiesClient.get(process.env.SLUG + '_lang') : navigator.language;
	}

	store.dispatch('setLang', locale);

	if (!store.getters.loaded) {
		let promises = [
			getPages(store, locale),
			getTranslations(store, locale)
		];
		return Promise.all(promises).then(() => {
			store.dispatch('hasLoaded');
		});
	} else {
		return new Promise(resolve => resolve());
	}
};
