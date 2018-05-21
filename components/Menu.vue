<template>
	<nav :class="['menu', menuIsOpen ? 'open' : '']">
		<ul class="menuItems">
			<li v-for="(item, i) in items" :key="i" class="menuItem" ref="items">
				<div class="titleWrapper">
					<div v-for="(letter, j) in item.title" :key="letter + j" class="letterWrapper">
						<span class="letter">{{ letter }}</span>
					</div>
				</div>
			</li>
		</ul>
	</nav>
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
	}
};
</script>


<style lang="scss">
@import '~assets/scss/variables.scss';
.menu {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	pointer-events: none;
	--menuLetterTransitionSpeed: 0.5s;
	.menuItems {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: space-around;
		align-items: center;
		.menuItem {
			.titleWrapper {
				font-family: 'Oswald';
				font-size: 3vw;
				color: white;
				.letterWrapper {
					text-transform: uppercase;
					display: inline-block;
					opacity: 0;
					backface-visibility: hidden;
					transition-duration: var(--menuLetterTransitionSpeed);
					transition-timing-function: var(--ease);
					transition-property: all;
					transform: translateY(20%);
				}
			}
		}
	}
	&.open {
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
					transition-delay: calc(var(--menuItemTransitionDelay) + (#{$j} - 1) * 0.02s);
					opacity: 1;
					transform: translateY(0);
				}
			}
		}
	}
}
</style>
