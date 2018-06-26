<template>
	<div id="app" :style="{
		'--vw': $store.getters.viewportSize.width + 'px',
		'--vh': $store.getters.viewportSize.height + 'px',
		'--current-color': $store.getters.currentColor
	}">
		<menu-comp :items="menuItems"></menu-comp>
		<main :class="[menuIsOpen ? 'menuOpen' : '', $route.name === 'intro' ? 'introLayout' : 'selectorLayout']">
			<intro-comp ref="intro" v-if="intro" :lastColor="items[items.length - 2].color"></intro-comp>
			<selector-comp ref="selector" :items="items" v-if="selector"></selector-comp>
			<nuxt/>
		</main>
	</div>
</template>

<script>
import throttle from 'lodash/throttle';
import selectorComp from '~/components/Selector';
import introComp from '~/components/Intro';
import MenuComp from '~/components/Menu';

export default {
	data() {
		return {
			items: this.$t('categories').items,
			intro: this.$route.name === 'intro',
			selector: this.$route.name !== 'intro',
			menuItems: [
				{
					title: this.$t('Gallery'),
					slug: '/'
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
		},
		'$route': function(to, from) {
			if (from.name === 'intro' && to.name === 'index') {
				this.selector = true;
				const fadeDuration = 0.6;
				let unwatch = () => {};
				const tl = new TimelineMax({
					paused: true,
					onComplete: () => {
						this.intro = false;
						unwatch();
					}
				});
				unwatch = this.$watch('$store.getters.pageIsMounted', mounted => {
					if (mounted) {
						tl
						.to(this.$refs.intro.$el, 0.4, {
							'--maskYRight': 0
						})
						.to(this.$refs.intro.$el, 0.6, {
							'--maskYLeft': 0
						}, 0)
						.to(this.$refs.intro.$el, fadeDuration, {
							opacity: 0
						}, '+= 0.1')
						.add(() => {
							this.$refs.selector.spinAnimation();
						}, '-=' + fadeDuration * 0.8);
						tl.play();
					}
				});
			} else if (to.name === 'intro') {
				this.selector = false;
				this.intro = true;
			}
		}
	},

	mounted() {
		this.updateViewportSize();
		this.addEventListeners();
		this.$store.dispatch('layoutMounted');
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
			if (!this.menuIsOpen) {
				this.mousePosition = {
					x: e.clientX,
					y: e.clientY
				};
				TweenMax.to(this.easedMousePosition, 1.5, {
					x: e.clientX,
					y: e.clientY
				});
			}
		},

		addEventListeners() {
			window.addEventListener('resize', throttle(this.updateViewportSize, 50));
			window.addEventListener('scroll', throttle(this.updateScrollPosition, 20));
			window.addEventListener('mousemove', throttle(this.updateMousePosition, 50));
		}
	},

	components: {
		introComp,
		selectorComp,
		MenuComp
	}
};
</script>

<style lang="scss">
#app {
	--spacing-horizontal: 7.55rem;
	--spacing-horizontal-large: 12rem;
	--spacing: 3rem;
	--menu-transition-speed: 0.2s;
	--ease: cubic-bezier(0.165, 0.84, 0.44, 1);
	width: 100%;
	overflow-x: hidden;
}
main {
	--title-top-offset: 5rem;
	--transition-duration: 1.5s;
	--grey: #5d666d;
	--light-grey: #f6f8fa;
	--intro-blue: #acbee4;
	--medium-grey: #dbdbdb;
	--light-blue: #c1cbe0;
	--black: #494949;
	--text-grey: #a9b1b6;
	--exemple-blue: #e5edf4;
	--blue: #5781f8;
	--card-width: 17rem;

	text-line {
		transform-origin: top right;
	}

	.coloredBackground {
		background-color: var(--light-grey);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		clip-path: polygon(0 3rem, 100% 0%, 100% 100%, 0% 100%);
	}

	.intro {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
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
		transition: opacity var(--menu-transition-speed);
	}
	&.menuOpen {
		&:after {
			opacity: 0.65;
			z-index: 2;
		}
	}
}
</style>
