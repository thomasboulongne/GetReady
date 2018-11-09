<template>
	<div class="titleWrapper MTKnox" :style="{
		'--eased-mouse-position-percent-x': $store.getters.easedMousePositionPercent.x,
		'--eased-mouse-position-percent-y': $store.getters.easedMousePositionPercent.y,
		'--centeredOffsetX': centered ? '-50%' : '0%',
		'--centeredOffsetY': centered ? '-59%' : '0%'
	}" :class="centered ? 'centered' : ''">
		<slot></slot>
		<div class="MTKnox bigTitle">
			<div v-for="(letter, i) in title" :key="letter + i">
				<span class="letter">{{ letter }}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			default: 'S\'organiser'
		},
		centered: {
			default: false
		}
	},
	computed: {
		easedMousePositionPercent: function() {
			return this.$store.getters.easedMousePositionPercent;
		}
	}
};
</script>


<style lang="scss">
.titleWrapper {
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex-direction: column;
	color: white;
	// height: 50%;
	pointer-events: none;
	padding-top: var(--title-top-offset);
	--titleWrapperDelay: 2s;
	transform: translate(calc(var(--centeredOffsetX) + (var(--eased-mouse-position-percent-x) * 0.03%)), calc(var(--centeredOffsetY) + (var(--eased-mouse-position-percent-y) * 0.03%)));
	transform-style: preserve-3d;
	&.centered {
		position: absolute;
		top: 50%;
		left: 50%;
	}
	.bigTitle {
		font-size: 16vmax;
		margin: 0;
		white-space: nowrap;
		position: relative;
		display: block;
		--y-offset: 0;
		div {
			display: inline-block;
			position: relative;
			z-index: 2;
			.letter {
				display: inline-block;
			}
			@for $i from 1 to 30 {
				&:nth-child(#{$i}) {
					.letter {
						transform: translateY(calc(#{$i} * var(--y-offset) * 1em));
					}
				}
			}
		}
	}
}
</style>
