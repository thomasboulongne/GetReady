import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
	app.i18n = new VueI18n({
		locale: store.state.uiData.locale,
		fallbackLocale: 'en',
		messages: {
			'en': require('~/localization/en.json'),
			'fr': require('~/localization/fr.json')
		}
	});
};
