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
					title: 'Gallery'
				},
				{
					title: 'Concentrate'
				},
				{
					title: 'Have a goal'
				},
				{
					title: 'Visualize'
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
			window.addEventListener('click', () => { this.$store.dispatch('toggleMenu'); });
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
@import '~assets/scss/variables.scss';
main {
	transition: filter var(--menuTransitionSpeed), transform var(--menuTransitionSpeed);
	transform: scale(1) translate3d(0, 0, 0);
	backface-visibility: hidden;
	transform-style: preserve-3d;
	&.menuOpen {
		filter: blur(4px) brightness(0.5);
		transform: scale(1.02) translate3d(0, 0, 0);
	}
}
</style>
