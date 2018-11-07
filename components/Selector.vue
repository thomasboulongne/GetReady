<template>
	<div :class="['selector', canSlide ? 'canAnimate' : '', clipped ? 'clipped' : '']" v-hammer:pan.horizontal="panGesture" :style="{
		'--current-color': backgroundColor,
		'--transition-speed': transitionSpeed * 0.75 + 's',
		'--eased-mouse-position-percent-x': easedMousePositionPercent.x,
		'--eased-mouse-position-percent-y': easedMousePositionPercent.y,
		'--ratio': (vh / vw).toFixed(2),
		'--background-transition-duration': backgroundTransitionDuration + 's',
		'--navigation-arrows-area-width': navigationArrowsAreaWidth + '%',
		'cursor': cursor,
		'--current-slide': progressionSlide
	}">
		<div class="background"></div>
		<ul class="selectorList" :style="{'--number-of-items': numberOfItems}">
			<!-- Clones -->
			<selector-item-comp :item="secondLastItem" :index="items.length - 2" :numberOfItems="numberOfItems" :progression="progressionSlide" :elementIndex="0">
			</selector-item-comp>
			<selector-item-comp :item="lastItem" :index="items.length - 1" :numberOfItems="numberOfItems" :progression="progressionSlide" :elementIndex="1">
			</selector-item-comp>

			<!-- Loop -->
			<selector-item-comp v-for="(item, i) in items" :key="item.color + i" ref="items" :item="item" :index="i" :numberOfItems="numberOfItems" :progression="progressionSlide" :elementIndex="i + 2">
			</selector-item-comp>

			<!-- Clones -->
			<selector-item-comp :item="firstItem" :index="0" :numberOfItems="numberOfItems" :progression="progressionSlide" :elementIndex="numberOfItems + 4 - 2">
			</selector-item-comp>
			<selector-item-comp :item="secondItem" :index="1" :numberOfItems="numberOfItems" :progression="progressionSlide" :elementIndex="numberOfItems + 4 - 1">
			</selector-item-comp>
		</ul>
		<div class="nav" ref="nav">
			<div class="left" @click="prev">
				<div class="arrow">
					<img src="~/assets/images/arrow.svg"/>
				</div>
			</div>
			<div class="right" @click="next">
				<div class="arrow">
					<img src="~/assets/images/arrow.svg"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import SelectorItemComp from '~/components/SelectorItem';
export default {
	props: {
		items: {
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {
			canSlide: false,
			canInteract: false,
			progressionSlide: 0,
			transitionSpeed: 1,
			navigationArrowsAreaWidth: 15,
			navigationIndicationSlide: 0.02,
			backgroundTransitionDuration: 0,
			cursor: '-webkit-grab',
			height: this.vh,
			clipped: false,
			easedMousePositionPercent: {
				x: 0,
				y: 0
			}
		};
	},
	computed: {
		numberOfItems: function() {
			return this.items.length;
		},
		vw: function() {
			return this.$store.getters.viewportSize.width;
		},
		vh: function() {
			return this.$store.getters.viewportSize.height;
		},
		backgroundColor: function() {
			const slideIndex = Math.min(Math.max(Math.round(this.progressionSlide > this.numberOfItems - 0.4 ? this.progressionSlide - this.numberOfItems : this.progressionSlide < -0.4 ? this.progressionSlide + this.numberOfItems : this.progressionSlide), 0), this.numberOfItems - 1);
			return this.items[slideIndex].color;
		},
		currentSlide: function() {
			return this.$store.getters.currentSlide;
		},
		offset: function() {
			return -0.0115 * this.vh;
		},
		firstItem: function() {
			return this.items[0];
		},
		secondItem: function() {
			return this.items[1];
		},
		lastItem: function() {
			return this.items[this.items.length - 1];
		},
		secondLastItem: function() {
			return this.items[this.items.length - 2];
		}
	},
	watch: {
		'$store.getters.easedMousePositionPercent': function(position) {
			if (this.$store.getters.scrollPosition.y < this.vh) {
				this.easedMousePositionPercent = position;
			}
		},
		'currentSlide': function(index) {
			this.progressionSlide = index;
		},
		'$store.getters.viewportSize': function() {
			this.onWindowResize();
		},
		'$store.getters.mousePositionPercent': function(position) {
			if (this.canSlide && this.canInteract) {
				if (position.x > 100 - this.navigationArrowsAreaWidth) {
					this.navigationIndicationSlideLeft();
				} else if (position.x < this.navigationArrowsAreaWidth) {
					this.navigationIndicationSlideRight();
				} else {
					this.navigationIndicationSlideReset();
				}
			}
		},
		'height': function() {
			this.onWindowResize();
		},
		'$route': function(to) {
			this.initRotation(to);
		}
	},

	mounted() {
		this.addEventListeners();
		this.canSlide = this.$route.name === 'index';
		this.canInteract = this.$route.name === 'index';
		this.height = this.vh;
		this.initRotation(this.$route);
	},

	beforeDestroy() {
		this.removeEventListeners();
	},

	methods: {
		transitionTitle() {
			// const mounted = this.$store.getters.pageIsMounted;
			// if (mounted === true) {
			// 	const duration = 1.3;
			// 	const letterDuration = 0.5;
			// 	if (this.$route.name === 'page') {
			// 		const tl = new TimelineMax({ paused: true });
			// 		tl.fromTo(this.$el, duration, {
			// 			'--mask': 0
			// 		}, {
			// 			'--mask': 50,
			// 			ease: Power4.easeOut,
			// 			pointerEvents: 'none'
			// 		})
			// 		.to(this.$refs.nav.querySelectorAll('.left, .right'), duration / 3, {
			// 			opacity: 0,
			// 			pointerEvents: 'none'
			// 		}, 0)
			// 		.fromTo(this.$el.querySelector('.currentSlide .pagination'), duration / 5, {
			// 			opacity: 1
			// 		}, {
			// 			opacity: 0,
			// 			pointerEvents: 'none'
			// 		}, 0)
			// 		.fromTo(this.$el.querySelector('.currentSlide'), duration, {
			// 			'--x-offset': this.items[this.currentSlide].position.x
			// 		}, {
			// 			'--x-offset': 5,
			// 			ease: Power4.easeOut
			// 		}, 0)
			// 		.fromTo(this.$el.querySelector('.currentSlide .img'), duration, {
			// 			'--imgTop': 45
			// 		}, {
			// 			'--imgTop': 40,
			// 			ease: Power4.easeOut
			// 		}, 0);
			// 		Array.from(this.$el.querySelectorAll('.currentSlide .letter')).forEach((letter, i) => {
			// 			tl.fromTo(letter, letterDuration, {
			// 				y: i * this.offset
			// 			}, {
			// 				y: i * this.offset - this.vh * 0.15
			// 			}, i * letterDuration / 16.5);
			// 		});
			// 		tl
			// 		.fromTo(this.$el.querySelector('.currentSlide .subtitle'), duration / 5, {
			// 			opacity: 1
			// 		}, {
			// 			opacity: 0,
			// 			pointerEvents: 'none'
			// 		}, 0)
			// 		.fromTo(this.$el.querySelector('.currentSlide .callToAction'), duration / 5, {
			// 			opacity: 1
			// 		}, {
			// 			opacity: 0,
			// 			pointerEvents: 'none'
			// 		}, 0);
			// 		tl.play();
			// 	}
			// }
		},
		initRotation(route) {
			if (route.name === 'page') {
				const index = this.$t('categories.items').findIndex(i => i.slug === route.params.slug);
				this.$store.dispatch('updateCurrentSlide', index);
			}
		},
		addEventListeners() {
			window.addEventListener('keydown', this.keyboardEvent);
		},
		removeEventListeners() {
			window.removeEventListener('keydown', this.keyboardEvent);
		},
		keyboardEvent(event) {
			switch (event.key) {
				case 'ArrowLeft':
					this.prev();
					break;
				case 'ArrowRight':
					this.next();
					break;
			}
		},
		navigationIndicationSlideLeft() {
			TweenMax.to(this, 1.2, {
				progressionSlide: this.currentSlide + 0.05,
				ease: Power2.easeOut
			});
		},
		navigationIndicationSlideRight() {
			TweenMax.to(this, 1.2, {
				progressionSlide: this.currentSlide - 0.05,
				ease: Power2.easeOut
			});
		},
		navigationIndicationSlideReset() {
			TweenMax.to(this, 1.2, {
				progressionSlide: this.currentSlide,
				ease: Power2.easeOut
			});
		},
		panGesture(e) {
			if (this.canInteract) {
				if (e.isFinal) {
					this.canSlide = true;
					this.cursor = '-webkit-grab';
					switch (e.offsetDirection) {
						case 2:
							this.next();
							break;
						case 4:
							this.prev();
							break;
					}
				} else {
					this.canSlide = false;
					this.cursor = '-webkit-grabbing';
					switch (e.offsetDirection) {
						case 2:
							this.navigationIndicationSlideLeft();
							break;
						case 4:
							this.navigationIndicationSlideRight();
							break;
					}
				}
			}
		},
		leaveAnimationTween() {
			return TweenMax.to(this.$el, 1, {
				'height': this.vh / 2,
				ease: Power4.easeOut
			});
		},
		prev() {
			const newSlide = Math.round(this.progressionSlide - 1);
			this.slide(newSlide);
		},
		next() {
			const newSlide = Math.round(this.progressionSlide + 1);
			this.slide(newSlide);
		},
		slide(to) {
			console.log(this.canInteract);

			if (this.canSlide && this.canInteract) {
				this.backgroundTransitionDuration = 0.4;
				this.canInteract = false;
				return new Promise(resolve => {
					const tl = new TimelineMax({
						onComplete: () => {
							const newIndex = (to < 0 ? this.items.length - 1 : to > this.items.length - 1 ? 0 : to);
							this.progressionSlide = newIndex;
							this.$store.dispatch('updateCurrentSlide', newIndex);
							this.canInteract = true;
							resolve();
						}
					});
					tl
					.to(this, this.transitionSpeed, {
						progressionSlide: to,
						ease: Power4.easeOut
					})
					;
				});
			}
		},
		onWindowResize() {
		},
		mod(n, m) {
			return ((n % m) + m) % m;
		}
	},

	components: {
		SelectorItemComp
	}
};
</script>


<style lang="scss">
.selector {
	height: 100vh;
	width: var(--vw);
	--mask: 0;
	--page-transition-duration: 1s;
	position: relative;
	cursor: grab;
	z-index: 1;
	.background {
		transition: background-color var(--background-transition-duration);
		background-color: var(--current-color);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - var(--mask) * 1%), 0% calc(100% - var(--mask) * 0.55%));
	}
	.nav {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		.left, .right {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: var(--navigation-arrows-area-width);
			pointer-events: all;
			cursor: w-resize;
			display: flex;
			align-items: flex-end;
			justify-content: flex-start;
			padding: 7vh 5vw;
			box-sizing: border-box;
		}
		.right {
			left: auto;
			right: 0;
			justify-content: flex-end;
			cursor: e-resize;
			img {
				transform: scale(-1);
			}
		}
	}
	.selectorList {
		--number-of-items: 3;
		--item-margin: calc(var(--vw) * 0.15);
		display: inline-flex;
		align-items: flex-start;
		justify-content: flex-start;
		--item-percentage: calc(100 / (var(--number-of-items) + 4) * 1%);
		--initial-offset: calc(var(--item-percentage) * -2);
		--translation-x: calc(var(--initial-offset) + (var(--current-slide) * var(--item-percentage) * -1));
		transform: translateX(var(--translation-x));
		margin-left: var(--item-margin);
	}
}

</style>
