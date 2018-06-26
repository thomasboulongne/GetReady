<template>
	<div class="slider">
		<ul class="items" v-hammer:pan.horizontal="pan" ref="items" @mousedown="grabCursor" @mouseup="defaultCursor" :style="{'cursor': cursor ? '-webkit-grabbing' : '-webkit-grab'}">
			<li class="item" v-for="(item, i) in items" :key="i" ref="item">
				<component :is="componentType" :item="item"></component>
			</li>
		</ul>
		<div class="sliderIndicator" :style="{'--percentage': sliderPercentage + '%'}"></div>
	</div>
</template>
<script>
import CardComp from '~/components/Card';
import CelebrityComp from '~/components/Celebrity';
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
			currentX: 0,
			itemWidth: 0,
			fullWidth: 0,
			displayed: false
		};
	},
	computed: {
		vw: function() {
			return this.$store.getters.viewportSize.width;
		},
		vh: function() {
			return this.$store.getters.viewportSize.height;
		}
	},
	watch: {
		'currentX': function(x) {
			this.sliderPercentage = (x * 100 / this.fullWidth).toFixed(2) * -1;
		},
		'$store.getters.viewportSize': function() {
			this.sizeItems();
		},
		'$store.getters.scrollPosition': function() {
			this.showItems();
		}
	},
	mounted() {
		this.sizeItems();
		this.showItems();
	},
	methods: {
		showItems() {
			if (!this.displayed && this.$refs.items.getBoundingClientRect().top < this.vh * 0.8) {
				TweenMax.fromTo(this.$refs.items, 1, {
					opacity: 0,
					x: this.vw * 0.2
				}, {
					opacity: 1,
					x: 0,
					ease: Power3.easeOut
				});
				this.displayed = true;
			}
		},
		sizeItems() {
			this.itemWidth = this.$refs.item[0].getBoundingClientRect().width;
			this.fullWidth = (this.itemWidth * this.items.length) - this.itemWidth;
		},
		pan(event) {
			const computedX = this.x + event.deltaX;
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
				} else if (newX < this.fullWidth * -1) {
					backX = this.fullWidth * -1;
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
		},
		next() {
			const computedX = this.x - this.itemWidth;
			if (computedX >= this.fullWidth * -1) {
				const tl = new TimelineMax({ paused: true });
				tl
				.to(this.$refs.items, 0.5, {
					x: computedX,
					ease: Power4.easeOut
				})
				.to(this, 0.5, {
					currentX: computedX,
					ease: Power4.easeOut
				}, 0);
				tl.play();
				this.x = computedX;
			}
		},
		prev() {
			const computedX = this.x + this.itemWidth;
			if (computedX <= 0) {
				const tl = new TimelineMax({ paused: true });
				tl
				.to(this.$refs.items, 0.5, {
					x: computedX,
					ease: Power4.easeOut
				})
				.to(this, 0.5, {
					currentX: computedX,
					ease: Power4.easeOut
				}, 0);
				tl.play();
				this.x = computedX;
			}
		}
	},
	components: {
		CardComp,
		CelebrityComp
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
		opacity: 0;
		.item {
			&:not(:last-child) {
				padding-right: 2rem;
			}
			img {
				user-select: none;
			}
		}
	}
	.sliderIndicator {
		width: var(--sliderIndicatorWidth);
		height: 2px;
		background-color: var(--medium-grey);
		margin: 0;
		margin-top: 3rem;
		position: relative;
		overflow: hidden;
		&:after {
			content: '';
			position: absolute;
			--selectionWidth: 33%;
			width: calc(var(--selectionWidth) + 1px);
			left: calc(var(--percentage) * 2/3);
			top: 0;
			height: 100%;
			background-color: var(--current-color);
		}
	}
}
</style>
