<template>
	<div :class="['navWrapper', menuIsOpen ? 'open' : '']" :style="{zIndex: $route.name === 'intro' ? 0 : 2}">
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
		</nav>
		<header :class="showHeader ? 'show' : ''">
			<div class="back">
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

	watch: {
		'$route': function() {
			this.$store.dispatch('closeMenu');
		},
		'$store.getters.scrollPosition.y': function(y, prevY) {
			if (this.$route.name === 'page') {
				if (y > this.$store.getters.viewportSize.height * 0.55) {
					this.blackBurger = true;
					if (y < prevY) {
						this.showHeader = true;
					} else {
						this.showHeader = false;
					}
				} else {
					this.showHeader = false;
					this.blackBurger = false;
				}
			} else {
				this.showHeader = false;
			}
		}
	},

	methods: {
		toggleMenu: function() {
			this.$store.dispatch('toggleMenu');
		}
	}
};
</script>


<style lang="scss">
.navWrapper {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 2;
	color: white;
	header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		pointer-events: all;
		clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%);
		transition: background-color 0.3s;
		.back {
			width: 10%;
			flex-grow: 0;
			flex-shrink: 0;
			margin: calc(2 / 3 * var(--spacing)) 0 var(--spacing) var(--spacing);
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.3s;
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
			margin: calc(var(--spacing) / 2) 0 var(--spacing);
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
			img, svg {
				width: 2rem;
			}
			.close {
				display: none;
				width: 1.5rem;
			}
			&.black {
				svg {
					path {
						stroke: black;
					}
				}
			}
		}

		&.show {
			background-color: var(--currentColor);
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
	.menu {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		--menuLetterTransitionSpeed: 0.5s;
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
			transition-delay: calc(var(--menuTransitionSpeed));
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
