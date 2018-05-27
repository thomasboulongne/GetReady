<template>
	<div :class="['navWrapper', menuIsOpen ? 'open' : '']">
		<nav :class="['menu']">
			<ul class="menuItems">
				<li v-for="(item, i) in items" :key="i" class="menuItem" ref="items">
					<div class="titleWrapper MTKnox">
						<div v-for="(letter, j) in item.title" :key="letter + j" class="letterWrapper">
							<span class="letter">{{ letter }}</span>
						</div>
					</div>
				</li>
			</ul>
		</nav>
		<div class="burger" @click="toggleMenu">
			MENU
		</div>
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

	computed: {
		menuIsOpen: function() {
			return this.$store.getters.menuIsOpen;
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
				.titleWrapper {
					margin: 0.5em;
					font-family: 'MTKnox';
					font-weight: bold;
					font-size: 3vw;
					color: white;
					cursor: pointer;
					position: relative;
					&:after {
						content: '';
						transition: all 0.2s !important;
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
	.burger {
		position: absolute;
		top: var(--spacing);
		right: var(--spacing);
		pointer-events: all;
		color: white;
		cursor: pointer;
	}
	&.open {
		.menu {
			opacity: 1;
			transition-delay: calc(var(--menuTransitionSpeed));
			pointer-events: all;
			.menuItem {
				@for $i from 1 to 6 {
					&:nth-child(#{$i}) {
						--menuItemTransitionDelay: calc((#{$i} - 1) * 0.15s);
					}
				}
				@for $j from 1 to 30 {
					.letterWrapper:nth-child(#{$j}) {
						transition: transform var(--menuLetterTransitionSpeed) var(--ease) calc(var(--menuItemTransitionDelay) + (#{$j} - 1) * 0.02s), opacity var(--menuLetterTransitionSpeed) var(--ease) calc((#{$j} - 1) * 0.02s);
						opacity: 0.65;
						transform: translateY(0);
					}
				}
			}
		}
	}
}
</style>
