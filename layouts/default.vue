<template>
	<div :style="{
		'--vw': $store.getters.viewportSize.width + 'px',
		'--vh': $store.getters.viewportSize.height + 'px'
	}">
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
					title: this.$t('categories.items[0].title'),
					slug: this.$t('categories.items[0].slug')
				},
				{
					title: this.$t('categories.items[1].title'),
					slug: this.$t('categories.items[1].slug')
				},
				{
					title: this.$t('categories.items[2].title'),
					slug: this.$t('categories.items[2].slug')
				}
			],
			mousePosition: {
				x: 0,
				y: 0
			},
			easedMousePosition: {
				x: 0,
				y: 0
			}
		};
	},

	computed: {
		menuIsOpen: function() {
			return this.$store.getters.menuIsOpen;
		}
	},

	watch: {
		'mousePosition': function(position) {
			this.$store.dispatch('updateMousePosition', position);
		},
		'easedMousePosition.x': function() {
			this.$store.dispatch('updateEasedMousePosition', this.easedMousePosition);
		},
		'easedMousePosition.y': function() {
			this.$store.dispatch('updateEasedMousePosition', this.easedMousePosition);
		}
	},

	created() {
		if (this.$store.getters.goal === null) {
			this.$router.push({name: 'intro'});
		}
	},

	mounted() {
		this.updateViewportSize();
		this.addEventListeners();
		this.$store.dispatch('layoutMounted');
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

		updateMousePosition(e) {
			this.mousePosition = {
				x: e.clientX,
				y: e.clientY
			};
			TweenMax.to(this.easedMousePosition, 1.5, {
				x: e.clientX,
				y: e.clientY
			});
		},

		addEventListeners() {
			window.addEventListener('resize', throttle(this.updateViewportSize, 50));
			window.addEventListener('scroll', throttle(this.updateScrollPosition, 50));
			window.addEventListener('mousemove', this.updateMousePosition);
		},

		removeEventListeners() {
			window.removeEventListener('resize', throttle(this.updateViewportSize, 50));
			window.removeEventListener('scroll', throttle(this.updateScrollPosition, 50));
			window.removeEventListener('mousemove', this.updateMousePosition);
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
	--titleTopOffset: 5rem;
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
