<template>
	<div>
		<menu-comp :item="menuItems"></menu-comp>
		<nuxt/>
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
