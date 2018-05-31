<template>
	<div>
		<menu-comp :items="menuItems"></menu-comp>
		<main :class="[menuIsOpen ? 'menuOpen' : '']">
			<nuxt/>
		</main>
	</div>
</template>

<script>

import throttle from 'lodash/throttle';
import MenuComp from '~/components/Menu';

export default {
	data() {
		return {
			menuItems: [
				{
					title: this.$t('Gallery'),
					slug: ''
				},
				{
					title: this.$t('categories.item1.title'),
					slug: 'organize'
				},
				{
					title: this.$t('categories.item2.title'),
					slug: 'organize'
				},
				{
					title: this.$t('categories.item3.title'),
					slug: 'organize'
				}
			]
		};
	},

	computed: {
		menuIsOpen: function() {
			return this.$store.getters.menuIsOpen;
		}
	},

	mounted() {
		this.updateViewportSize();
		this.addEventListeners();
	},

	beforeDestroy() {
		this.removeEventListeners();
	},

	methods: {
		updateViewportSize() {
			this.$store.dispatch('updateViewportSize', {width: window.innerWidth, height: window.innerHeight});
		},

		updateScrollPosition() {
			let position = [window.scrollX || window.scollLeft || document.getElementsByTagName('html')[0].scrollLeft, window.scrollY || window.scollTop || document.getElementsByTagName('html')[0].scrollTop];
			this.$store.dispatch('updateScrollPosition', {x: position[0], y: position[1]});
		},

		addEventListeners() {
			window.addEventListener('resize', throttle(this.updateViewportSize, 50));
			window.addEventListener('scroll', throttle(this.updateScrollPosition, 50));
		},

		removeEventListeners() {
			window.removeEventListener('resize', throttle(this.updateViewportSize, 50));
			window.removeEventListener('scroll', throttle(this.updateScrollPosition, 50));
		}
	},

	components: {
		MenuComp
	}
};
</script>

<style lang="scss">
main {
	transition: filter var(--menuTransitionSpeed), transform var(--menuTransitionSpeed);
	transform: scale(1) translate3d(0, 0, 0);
	backface-visibility: hidden;
	transform-style: preserve-3d;
	filter: blur(0.3px);
	@-moz-document url-prefix() {
		filter: none;
	}
	&:after {
		content: '';
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: black;
		opacity: 0;
		pointer-events: none;
		transition: opacity var(--menuTransitionSpeed);
	}
	&.menuOpen {
		filter: blur(6px);
		transform: scale(1.02) translate3d(0, 0, 0);
		&:after {
			opacity: 0.65;
		}
		@-moz-document url-prefix() {
			filter: none;
		}
	}
}
</style>
