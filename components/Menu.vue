<template>
	<div :class="['navWrapper', menuIsOpen ? 'open' : '', $route.name === 'intro' ? 'zHidden' : '']">
		<nav :class="['menu']">
			<ul class="menuItems">
				<li v-for="(item, i) in items" :key="i" class="menuItem" ref="items">
					<nuxt-link :to="item.slug" class="navTitleWrapper MTKnox">
						<div v-for="(letter, j) in item.title" :key="letter + j" class="letterWrapper">
							<span class="letter">{{ letter }}</span>
						</div>
					</nuxt-link>
				</li>
			</ul>
			<div :class="['burger']" @click="toggleMenu">
				<svg width="27" height="13" viewBox="0 0 27 13" class="open">
					<path fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="square" d="M26.5 6.5H1.48M26.5.5H1.48M26.5 12.5h-16"/>
				</svg>
				<img src="~/assets/images/close.svg" class="close" />
			</div>
		</nav>
		<header :class="showHeader ? 'show' : ''">
			<div class="back" @click="goBack">
				<img src="~/assets/images/arrow.svg" />
				<span v-t="'Back'"></span>
			</div>
			<div class="goalWrapper">
				<span v-t="'Your goal'"></span>
				<span class="goal" v-html="$store.getters.goal"></span>
			</div>
			<div :class="['burger', blackBurger ? 'black' : '']" @click="toggleMenu">
				<svg width="27" height="13" viewBox="0 0 27 13" class="open">
					<path fill="none" fill-rule="evenodd" stroke="#FFF" stroke-linecap="square" d="M26.5 6.5H1.48M26.5.5H1.48M26.5 12.5h-16"/>
				</svg>
				<img src="~/assets/images/close.svg" class="close" />
			</div>
		</header>
	</div>
</template>
<script>
import throttle from 'lodash/throttle';
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
			showHeader: false,
			blackBurger: false
		};
	},

	computed: {
		menuIsOpen: function() {
			return this.$store.getters.menuIsOpen;
		}
	},

	mounted() {
		if (this.$route.name === 'mes-fiches') {
			this.blackBurger = true;
		}
	},

	watch: {
		'$route': function() {
			this.$store.dispatch('closeMenu');
			if (this.$route.name === 'mes-fiches') {
				this.blackBurger = true;
				this.showHeader = false;
			}
		},
		'$store.getters.scrollPosition.y': function(y, prevY) {
			if (this.$route.name === 'page') {
				if (y > this.$store.getters.viewportSize.height * 0.55) {
					this.blackBurger = true;
					if (y < prevY) {
						if (this.prevY !== null) {
							if (this.prevY - y > this.$store.getters.viewportSize.height * 0.3) {
								this.showHeader = true;
							}
						} else {
							this.prevY = y;
						}
					} else {
						this.prevY = null;
						this.showHeader = false;
					}
				} else {
					this.showHeader = false;
					this.blackBurger = false;
				}
			} else if (this.$route.name === 'intro') {
				this.showHeader = false;
			}
		}
	},

	methods: {
		toggleMenu: function() {
			this.$store.dispatch('toggleMenu');
		},
		throttledHeader: throttle(function() {
			if (this.$store.getters.scrollPosition.y > this.$store.getters.viewportSize.height * 0.55) {
				this.showHeader = true;
			}
		}, 400, {
			leading: false
		}),
		goBack() {
			this.$router.go(-1);
		}
	}
};
</script>


<style lang="scss">
.navWrapper {
	pointer-events: none;
	color: white;
	&.zHidden {
		display: none;
	}
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		pointer-events: all;
		clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 2.5rem), 0% 100%);
		transition: background-color 0.4s;
		.back {
			width: 10%;
			flex-grow: 0;
			flex-shrink: 0;
			margin: calc(2 / 3 * var(--spacing)) 0 var(--spacing) var(--spacing);
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s;
			cursor: pointer;
			span {
				text-transform: uppercase;
				font-weight: 300;
				font-size: 0.77rem;
				letter-spacing: 1.4;
				margin-left: 1rem;
			}
		}
		.goalWrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: calc(var(--spacing) / 2) 0;
			flex-grow: 1;
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s;
			span:not(.goal) {
				text-transform: uppercase;
				font-weight: 300;
				font-size: 0.77rem;
				letter-spacing: 1.4;
			}
			.goal {
				font-family: 'Antonio';
				font-size: 1.66rem;
				font-weight: 600;
			}
		}

		&.show {
			background-color: var(--current-color);
			.goalWrapper, .back {
				opacity: 1;
				pointer-events: all;
			}
			.burger.black {
				svg {
					path {
						stroke: white;
					}
				}
			}
		}
	}
	.burger {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		width: 10%;
		flex-grow: 0;
		flex-shrink: 0;
		margin: calc(2 / 3 * var(--spacing)) var(--spacing) var(--spacing) 0;
		pointer-events: all;
		color: white;
		cursor: pointer;
		text-align: right;
		img, svg {
			display: inline-block;
			width: 2rem;
		}
		.close {
			display: none;
			width: 1rem;
		}
		&.black {
			svg {
				path {
					stroke: black;
				}
			}
		}
	}
	.menu {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3;
		--menuLetterTransitionSpeed: 0.5s;
		.burger {
			position: absolute;
			top: 0;
			right: 0;
			display: none;
		}
		.menuItems {
			display: flex;
			width: 100%;
			height: 100%;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.menuItem {
				.navTitleWrapper {
					margin: 0.5em;
					font-weight: bold;
					font-size: 4vw;
					color: white;
					cursor: pointer;
					position: relative;
					display: block;
					&:after {
						content: '';
						transition: all 0.4s var(--ease);
						position: absolute;
						top: 100%;
						height: 0.05em;
						width:0;
						background: white;
						left: 50%;
						transform: translateX(-50%) rotate(-3deg);
					}
					.letterWrapper {
						text-transform: uppercase;
						display: inline-block;
						opacity: 0;
						backface-visibility: hidden;
						transform: translateY(20%);
					}
					&:hover {
						&:after {
							width: 100%;
							transform: translateX(-50%) rotate(-3deg);
						}
						.letterWrapper {
							opacity: 1;
						}
					}
				}
			}
		}
	}
	&.open {
		.menu {
			opacity: 1;
			transition-delay: calc(var(--menu-transition-speed));
			pointer-events: all;
			.menuItem {
				@for $i from 1 to 6 {
					&:nth-child(#{$i}) {
						--menuItemTransitionDelay: calc((#{$i} - 1) * 0.07s);
					}
				}
				@for $j from 1 to 30 {
					.letterWrapper:nth-child(#{$j}) {
						transition: transform var(--menuLetterTransitionSpeed) var(--ease) calc(var(--menuItemTransitionDelay) + (#{$j} - 1) * 0.01s), opacity var(--menuLetterTransitionSpeed) var(--ease) calc((#{$j} - 1) * 0.03s);
						opacity: 0.65;
						transform: translateY(0);
					}
				}
			}
		}
		.burger {
			display: flex;
			.open {
				display: none;
			}
			.close {
				display: block;
			}
		}
	}
}
</style>
