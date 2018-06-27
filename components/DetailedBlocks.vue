<template>
	<div class="detailedBlocks">
		<div v-for="block in blocks" class="detailedBlock" :key="block['Title']" ref="blocks">
			<div :class="['illustration', !shadow ? 'noshadow' : '']" :style="{'--x': mousePositionPercent.x + '%', '--y': mousePositionPercent.y + '%'}">
				<img :src="PATH + block['Illustration']" alt="">
			</div>
			<div class="title">
				<span>{{ block['Title'].split('_')[0] }}</span>
				<span>{{ block['Title'].split('_')[1] }}</span>
			</div>
			<p v-html="block['Text']"></p>
		</div>
	</div>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
	props: {
		blocks: {
			default: function() {
				return [];
			}
		},
		shadow: {
			default: true
		}
	},
	data() {
		return {
			PATH: process.env.PATH,
			displayed: false,
			scrollVelocity: 0
		};
	},
	computed: {
		mousePositionPercent: function() {
			return {
				x: this.displayed ? (this.$store.getters.easedMousePositionPercent.x - 50) / 10 : 0,
				y: this.displayed ? (this.$store.getters.easedMousePositionPercent.y - 50) / 10 + this.scrollVelocity : 0
			};
		}
	},
	watch: {
		'$store.getters.scrollPosition.y': function(y, prevY) {
			this.checkDisplay();
			if (this.displayed) {
				const delta = (prevY - y) / 4;
				if (Math.abs(delta) > Math.abs(this.scrollVelocity)) {
					TweenMax.to(this, 1, {
						scrollVelocity: delta,
						overwrite: 'all'
					});
				}
				this.debouncedVelocityReset();
			}
		},
		'$store.getters.viewportSize': function() {
			this.checkDisplay();
		}
	},
	mounted() {
		this.tl = new TimelineMax({ paused: true });
		const duration = 1.2;
		this.tl
		.staggerFromTo(this.$refs.blocks.reverse(), duration, {
			opacity: 0,
			yPercent: 20,
			skewY: -10
		}, {
			opacity: 1,
			yPercent: 0,
			ease: Power4.easeOut,
			skewY: 0
		}, 0.2);
		this.checkDisplay();
	},
	methods: {
		debouncedVelocityReset: debounce(function() {
			TweenMax.to(this, 2, {
				scrollVelocity: 0,
				ease: Elastic.easeOut.config(0.6, 0.6),
				overwrite: 'all'
			});
		}, 10, { leading: false }),
		checkDisplay() {
			if (!this.displayed) {
				const rect = this.$el.getBoundingClientRect();
				if (rect.top < this.$store.getters.viewportSize.height * 0.9) {
					this.show();
					this.displayed = true;
				}
			}
		},
		show() {
			this.tl.play();
		}
	}
};
</script>
<style lang="scss">
.detailedBlocks {
	display: flex;
	width: 100%;
	max-width: 70rem;
	margin: auto;
	justify-content: space-between;
	align-items: flex-start;
	margin-top: 7rem;
	.detailedBlock {
		background-color: var(--light-grey);
		padding: 8rem 2.77rem 3.88rem;
		padding-top: 8rem;
		width: 46%;
		box-sizing: border-box;
		border-radius: 1em;
		box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.05);
		transform-origin: right;
		position: relative;
		.title {
			font-family: 'Antonio';
			color: var(--grey);
			text-transform: uppercase;
			font-size: 1.77rem;
			font-weight: bold;
			line-height: 1.2;
			span:last-child {
				display: block;
				font-size: 1.59em;
			}
		}
		p {
			width: 100%;
		}
		.illustration {
			position: absolute;
			width: 25%;
			top: 0;
			right: 10%;
			transform: translateY(-50%);
			img {
				position: relative;
				z-index: 1;
				width: 100%;
				transform: translate(var(--x), var(--y));
			}
			&.noshadow {
				width: 60%;
				transform: translate(25%, -33%);
			}
		}
		&:nth-child(1) {
			.illustration {
				transform: translate(10%, -30%);
				&:not(.noshadow):after {
					content: '';
					position: absolute;
					top: 110%;
					height: 0.7rem;
					width: 80%;
					border-radius: 100%;
					background: rgba(0, 0, 0, 0.05);
					left: 50%;
					transform: translateX(-50%);
					z-index: 0;
				}
			}
		}
		&:nth-child(2){
			transform: translateY(-5rem);
			img {
				transform: translate(calc(var(--x) * 1.5), calc(var(--y) * 1.5));
			}
			.illustration:not(.noshadow) {
				width: 36%;
				perspective: 100rem;
				perspective-origin: bottom right;
				&:after {
					content: '';
					position: absolute;
					top: 110%;
					height: 2rem;
					width: 100%;
					background: rgba(0, 0, 0, 0.05);
					left: 50%;
					transform: translateX(-50%);
					--pathOffset: 20%;
					clip-path: polygon(0 var(--pathOffset), var(--pathOffset) 0, 100% calc(100% - var(--pathOffset)), calc(100% - var(--pathOffset)) 100%);
				}
			}
		}
	}
}
</style>
