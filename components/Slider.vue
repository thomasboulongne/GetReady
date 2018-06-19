<template>
	<div class="slider">
		<ul class="items" v-hammer:pan.horizontal="pan" ref="items" @mousedown="grabCursor" @mouseup="defaultCursor" :style="{'cursor': cursor ? '-webkit-grabbing' : '-webkit-grab'}">
			<li class="item" v-for="(item, i) in items" :key="i">
				<component :is="componentType" :item="item"></component>
			</li>
		</ul>
		<div class="sliderIndicator" :style="{'--percentage': sliderPercentage + '%'}"></div>
	</div>
</template>
<script>
import CardComp from '~/components/Card';

export default {
	props: {
		items: {
			default: function() {
				return [];
			}
		},
		componentType: {
			default: ''
		}
	},
	data() {
		return {
			x: 0,
			cursor: false,
			sliderPercentage: 0,
			currentX: 0
		};
	},
	watch: {
		'currentX': function(x) {
			const itemWidth = this.$refs.items.querySelector('.item').getBoundingClientRect().width;
			const fullWidth = (itemWidth * this.items.length) - itemWidth;
			this.sliderPercentage = (x * 100 / fullWidth).toFixed(2) * -1;
		}
	},
	methods: {
		pan(event) {
			const computedX = this.x + event.deltaX;
			const itemWidth = this.$refs.items.querySelector('.item').getBoundingClientRect().width;
			const fullWidth = (itemWidth * this.items.length) - itemWidth;
			let newX = computedX;
			TweenMax.set(this.$refs.items, {
				x: newX
			});
			TweenMax.set(this, {
				currentX: newX
			});
			if (event.isFinal) {
				newX = computedX + event.velocityX * 50;
				let backX = null;
				if (newX > 0) {
					backX = 0;
				} else if (newX < fullWidth * -1) {
					backX = fullWidth * -1;
				}
				const tl = new TimelineMax({ paused: true });

				tl
				.to(this.$refs.items, backX === null ? 0.5 : 0.1, {
					x: newX
				})
				.to(this, backX === null ? 0.5 : 0.1, {
					currentX: newX
				}, 0);

				if (backX !== null) {
					const backDuration = 0.9;
					tl
					.to(this.$refs.items, backDuration, {
						x: backX,
						ease: Power4.easeOut
					})
					.to(this, backDuration, {
						currentX: backX,
						ease: Power4.easeOut
					}, '-=' + backDuration);
				}
				tl.play();
				this.x = backX === null ? newX : backX;
			}
		},
		grabCursor() {
			this.cursor = true;
		},
		defaultCursor() {
			this.cursor = false;
		}
	},
	components: {
		CardComp
	}
};
</script>


<style lang="scss">
.slider {
	position: relative;
	.items {
		margin-top:4rem;
		display: flex;
		flex-wrap: nowrap;
		.item {
			&:not(:last-child) {
				padding-right: 2rem;
			}
		}
	}
	.sliderIndicator {
		width: var(--sliderIndicatorWidth);
		height: 2px;
		background-color: var(--mediumGrey);
		margin: 0;
		margin-top: 3rem;
		position: relative;
		overflow: hidden;
		&:after {
			content: '';
			position: absolute;
			--selectionWidth: 33%;
			width: var(--selectionWidth);
			left: calc(var(--percentage) * 2/3);
			top: 0;
			height: 100%;
			background-color: var(--currentColor);
		}
	}
}
</style>
