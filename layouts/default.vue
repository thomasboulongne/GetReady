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
		<footer v-if="$route.name === 'page'">
			<div class="summaryCards">
				<div class="coloredBackground">
				</div>
				<nuxt-link :to="'/' + $t('my-cards')">
					<summary-card-indicator-comp></summary-card-indicator-comp>
				</nuxt-link>
			</div>
			<div class="footerNavWrapper coloredBackground">
				<nav>
					<ul>
						<li class="menuItem" ref="footerPrevItem">
							<div class="background" :style="{backgroundColor: prevPage.color}"></div>
							<a class="navTitleWrapper MTKnox" @click.prevent="goToPage(-1)">
								<div v-for="(letter, j) in prevPage.title" :key="letter + j" class="letterWrapper">
									<span class="letter">{{ letter }}</span>
								</div>
							</a>
						</li>
						<li class="menuItem">
							<nuxt-link :to="{name:'index'}" class="navTitleWrapper MTKnox">
								<div v-for="(letter, j) in $t('Back to homepage')" :key="letter + j" class="letterWrapper">
									<span class="letter">{{ letter }}</span>
								</div>
							</nuxt-link>
						</li>
						<li class="menuItem" ref="footerNextItem">
							<div class="background" :style="{backgroundColor: nextPage.color}"></div>
							<a class="navTitleWrapper MTKnox" @click.prevent="goToPage(1)">
								<div v-for="(letter, j) in nextPage.title" :key="letter + j" class="letterWrapper">
									<span class="letter">{{ letter }}</span>
								</div>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
		<div class="footerTransition" ref="footerTransition"></div>
	</div>
</template>

<script>
import throttle from 'lodash/throttle';
import selectorComp from '~/components/Selector';
import introComp from '~/components/Intro';
import MenuComp from '~/components/Menu';
import SummaryCardIndicatorComp from '~/components/SummaryCardIndicator';

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
		},
		pageIndex: function() {
			if (this.$route.name === 'page') {
				return this.$t('categories.items').findIndex(cat => cat.slug === this.$route.params.slug);
			}
			return false;
		},
		prevPage: function() {
			if (this.pageIndex !== false) {
				const index = this.pageIndex - 1 < 0 ? this.$t('categories.items').length - 1 : this.pageIndex - 1;
				return this.$t('categories.items')[index];
			}
			return {};
		},
		nextPage: function() {
			if (this.pageIndex !== false) {
				const index = this.pageIndex + 1 === this.$t('categories.items').length ? 0 : this.pageIndex + 1;
				return this.$t('categories.items')[index];
			}
			return {};
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
		},
		'$store.getters.pageIsMounted': function(mounted) {
			if (mounted) {
				const tl = new TimelineMax({ paused: true });
				tl.to(this.$refs.footerTransition, 0.5, {
					opacity: 0
				})
				.set(this.$refs.footerTransition, {
					clearProps: 'all'
				})
				.set([this.$refs.footerNextItem, this.$refs.footerPrevItem], {
					clearProps: 'all'
				})
				;
				tl.play();
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
		},
		goToPage(direction) {
			const page = direction > 0 ? this.nextPage : this.prevPage;
			const item = direction > 0 ? this.$refs.footerNextItem : this.$refs.footerPrevItem;
			const tl = new TimelineMax({ paused: true });
			tl
			.set(item, {
				'--bgZIndex': 3
			})
			.set(this.$refs.footerTransition, {
				'background-color': page.color
			})
			.to(item, 0.5, {
				'--bgScale': 1,
				'--bgClip': 0,
				ease: Power4.easeOut
			})
			.to(item, 0.2, {
				'--title-opacity': 0
			})
			.to(this.$refs.footerTransition, 1, {
				scaleY: 1,
				ease: Power4.easeOut
			}, '-=0.1')
			.add(() => {
				this.$router.push({name: 'page', params: {slug: page.slug}});
			})
			;
			tl.play();
		}
	},

	components: {
		introComp,
		selectorComp,
		MenuComp,
		SummaryCardIndicatorComp
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
	width: 100%;
	overflow-x: hidden;
	overflow: hidden;
}
main {

	text-line {
		transform-origin: top right;
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

.coloredBackground {
	background-color: var(--light-grey);
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	clip-path: polygon(0 3rem, 100% 0%, 100% 100%, 0% 100%);
}

footer {
	position: relative;
	margin-top: 4rem;
	.summaryCards {
		position: relative;
		height: 11.2rem;
		margin-bottom: -3rem;
		.summaryCardIndicator {
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 1.5rem;
		}
	}
	.footerNavWrapper {
		position: relative;
		padding: 10rem 0;
		background-color: var(--current-color);
		nav {
			--menuLetterTransitionSpeed: 0.5s;
			ul {
				width: 100%;
				display: flex;
				justify-content: space-between;
				list-style-type: none;
				margin: 0;
				padding: 0;
				.menuItem {
					width: 33%;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					--bgScale: 0;
					--bgClip: 8;
					--bgZIndex: 1;
					--title-opacity: 1;
					.background {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						z-index: var(--bgZIndex);
						width: 100%;
						transform: scaleX(var(--bgScale));
						transition: transform 0.3s var(--ease);
						transform-origin: left;
						clip-path: polygon(0 0, 100% 0, calc(100% - var(--bgClip) * 1%) 100%, 0 100%);
					}
					&:last-child {
						.background {
							left: auto;
							right: 0;
							transform-origin: right;
							clip-path: polygon(0 0, 100% 0, 100% 100%, calc(var(--bgClip) * 1%) 100%);
						}
					}
					&:hover {
						--bgScale: 0.33;
					}
					.navTitleWrapper {
						font-weight: bold;
						font-size: 2rem;
						color: white;
						cursor: pointer;
						position: relative;
						display: flex;
						z-index: calc(var(--bgZIndex) + 1);
						opacity: var(--title-opacity);
						&:hover {
							.letterWrapper {
								opacity: 1;
							}
						}
						.letterWrapper {
							text-transform: uppercase;
							display: inline-block;
							backface-visibility: hidden;
							transform: translateY(20%);
						}
					}
					&:nth-child(1), &:nth-child(3) {
						.navTitleWrapper{
							--footerNavLineScale: 5.5vw;
							&:after, &:before {
								content: '';
								position: absolute;
								top: 50%;
								height: 0.1em;
								width: var(--footerNavLineScale);
								background: white;
								right: calc(100% + 2rem);
								transform-origin: right;
								transition: width 0.2s;
								transform: translateY(-50%);
							}
							&:after {
								width: 11vw;
								height: 1px;
								transform: translateY(-50%);
							}
							&:hover {
								--footerNavLineScale: 11vw;
							}
						}
					}
					&:nth-child(3) {
						.navTitleWrapper{
							&:after, &:before {
								right: auto;
								left: calc(100% + 2rem);
							}
						}
					}
					&:nth-child(2) {
						.navTitleWrapper:after {
							content: '';
							transition: all 0.4s var(--ease);
							position: absolute;
							top: 110%;
							height: 0.1em;
							width: 0;
							background: white;
							left: 50%;
							transform: translateX(-50%) rotate(-3deg);
						}
						.navTitleWrapper:hover {
							&:after {
								width: 93%;
								transform: translateX(-50%) rotate(-3deg);
							}
						}
					}
					a {
						color: white;
						font-family: 'Antonio';
						text-transform: uppercase;
						font-weight: 600;
						text-decoration: none;
					}
					@for $j from 1 to 30 {
						.letterWrapper:nth-child(#{$j}) {
							transition: transform var(--menuLetterTransitionSpeed) var(--ease) calc((#{$j} - 1) * 0.01s), opacity var(--menuLetterTransitionSpeed) var(--ease) calc((#{$j} - 1) * 0.02s);
							opacity: 0.65;
							transform: translateY(0);
						}
					}
				}
			}
		}
	}
}
.footerTransition {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	transform-origin: bottom;
	transform: scaleY(0);
}
</style>
