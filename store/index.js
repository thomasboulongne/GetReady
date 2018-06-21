import Vuex from 'vuex';
import CookiesClient from 'js-cookie';
import Vue from 'vue';

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
			mousePosition: {
				x: 0,
				y: 0
			},
			easedMousePosition: {
				x: 0,
				y: 0
			},
			mousePositionPercent: {
				x: 0,
				y: 0
			},
			easedMousePositionPercent: {
				x: 0,
				y: 0
			},
			locale: 'fr',
			menuOpen: false,
			layoutMounted: false
		},
		userData: {
			goal: null
		},

		currentSlide: 0,

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
		UPDATE_MOUSE_POSITION(state, position) {
			state.uiData.mousePosition = position;
		},
		UPDATE_EASED_MOUSE_POSITION(state, position) {
			state.uiData.easedMousePosition = position;
		},
		UPDATE_MOUSE_POSITION_PERCENT(state, position) {
			state.uiData.mousePositionPercent = position;
		},
		UPDATE_EASED_MOUSE_POSITION_PERCENT(state, position) {
			state.uiData.easedMousePositionPercent = position;
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
		},
		SET_GOAL(state, goal) {
			state.userData.goal = goal;
		},
		UPDATE_CURRENT_SLIDE(state, index) {
			state.currentSlide = index;
		},
		LAYOUT_MOUNTED(state) {
			state.uiData.layoutMounted = true;
		},
		USER_DATA_ADD_FIELD(state, {key, value}) {
			if (state.userData[key] !== undefined) {
				state.userData[key].push(value);
			} else {
				Vue.set(state.userData, key, [value]);
			}
		},
		USER_DATA_REMOVE_FIELD(state, { key, i }) {
			state.userData[key].splice(i, 1);
		},
		USER_DATA_UPDATE_FIELD(state, { key, i, value }) {
			state.userData[key][i] = value;
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
		updateMousePosition({ commit, getters }, position) {
			commit('UPDATE_MOUSE_POSITION', position);
			const positionPercent = {
				x: position.x * 100 / (getters.viewportSize.width || 1),
				y: position.y * 100 / (getters.viewportSize.height || 1)
			};
			commit('UPDATE_MOUSE_POSITION_PERCENT', positionPercent);
		},
		updateEasedMousePosition({ commit, getters }, position) {
			commit('UPDATE_EASED_MOUSE_POSITION', position);
			const positionPercent = {
				x: position.x * 100 / (getters.viewportSize.width || 1),
				y: position.y * 100 / (getters.viewportSize.height || 1)
			};
			commit('UPDATE_EASED_MOUSE_POSITION_PERCENT', positionPercent);
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
		},
		setGoal({ commit, state }, goal) {
			commit('SET_GOAL', goal);
			CookiesClient.set('reachyourgoal_goal', goal);
		},
		updateCurrentSlide({ commit }, index) {
			commit('UPDATE_CURRENT_SLIDE', index);
		},
		layoutMounted({ commit }) {
			commit('LAYOUT_MOUNTED');
		},
		userDataAddField({ commit }, params) {
			commit('USER_DATA_ADD_FIELD', params);
		},
		userDataRemoveField({ commit }, params) {
			commit('USER_DATA_REMOVE_FIELD', params);
		},
		userDataUpdateField({ commit }, params) {
			commit('USER_DATA_UPDATE_FIELD', params);
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
		mousePosition: state => state.uiData.mousePosition,
		easedMousePosition: state => state.uiData.easedMousePosition,
		mousePositionPercent: state => state.uiData.mousePositionPercent,
		easedMousePositionPercent: state => state.uiData.easedMousePositionPercent,
		menuIsOpen: state => state.uiData.menuOpen,
		loaded: state => state.contentLoaded,
		translation: state => identifier => {
			return state.translations.find(t => t.identifier == identifier) ? state.translations.find(t => t.identifier == identifier).translations : identifier;
		},
		lang: state => state.uiData.lang,
		goal: state => state.userData.goal,
		userData: state => key => state.userData[key],
		currentSlide: state => state.currentSlide,
		isLayoutMounted: state => state.uiData.layoutMounted
	}
});

export default store;
