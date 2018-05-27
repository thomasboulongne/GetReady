import Vuex from 'vuex';

const store = () => new Vuex.Store({
	state: {
		pages: [],
		lists: [],
		uiData: {
			viewportSize: {
				width: process.browser ? window.innerWidth : 1,
				height: process.browser ? window.innerHeight : 1
			},
			scrollPosition: {
				x: 0,
				y: 0
			},
			locale: 'fr',
			menuOpen: false
		},

		contentLoaded: false,

		translations: []
	},

	mutations: {
		ADD_PAGE(state, page) {
			state.pages.push(page);
		},
		ADD_LIST(state, list) {
			state.lists.push(list);
		},
		UPDATE_VIEWPORT_SIZE(state, size) {
			state.uiData.viewportSize = size;
		},
		UPDATE_SCROLL_POSITION(state, position) {
			state.uiData.scrollPosition = position;
		},
		CONTENT_LOADED(state) {
			state.contentLoaded = true;
		},
		SET_LANG(state, lang) {
			state.uiData.lang = lang;
		},
		ADD_TRANSLATION(state, translation) {
			state.translations.push(translation);
		},
		UPDATE_MENU_OPEN(state, isOpen) {
			state.uiData.menuOpen = isOpen;
		}
	},

	actions: {
		addPage({ commit }, page) {
			commit('ADD_PAGE', page);
		},
		addList({ commit }, list) {
			commit('ADD_LIST', list);
		},
		updateViewportSize({ commit }, size) {
			commit('UPDATE_VIEWPORT_SIZE', size);
		},
		updateScrollPosition({ commit }, position) {
			commit('UPDATE_SCROLL_POSITION', position);
		},
		hasLoaded({ commit }) {
			commit('CONTENT_LOADED');
		},
		addTranslation({ commit }, translation) {
			commit('ADD_TRANSLATION', translation);
		},
		setLang({ commit }, lang) {
			commit('SET_LANG', lang);
		},
		openMenu({ commit }) {
			commit('UPDATE_MENU_OPEN', true);
		},
		closeMenu({ commit }) {
			commit('UPDATE_MENU_OPEN', false);
		},
		toggleMenu({ commit, state }) {
			commit('UPDATE_MENU_OPEN', !state.uiData.menuOpen);
		}
	},

	getters: {
		page: state => slug => state.pages.find(p => p.slug == slug),
		list: state => (identifier, number = 0) => {
			const list = state.lists.find(list => list.identifier == identifier);
			if (list && number > 0) {
				return list.elements.slice(0, number);
			} else if (list && number == 0) {
				return list.elements;
			}
			return [];
		},
		viewportSize: state => state.uiData.viewportSize,
		scrollPosition: state => state.uiData.scrollPosition,
		menuIsOpen: state => state.uiData.menuOpen,
		loaded: state => state.contentLoaded,
		translation: state => identifier => {
			return state.translations.find(t => t.identifier == identifier) ? state.translations.find(t => t.identifier == identifier).translations : identifier;
		},
		lang: state => state.uiData.lang
	}
});

export default store;
