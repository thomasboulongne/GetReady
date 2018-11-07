<template>
	<li>
		<div :class="['selectorItem', titleStatus === 'ANIMATED' ? 'animated' : '']" ref="item" :style="{
				'--background-color': item.color,
				'--x-offset': item.position.x,
				'--y-offset': item.position.y,
				'--x-shadow-offset': item.shadow.x + '%',
				'--y-shadow-offset': item.shadow.y + '%',
				'--number-of-letters': item.title.length,
				'--transform-origin': transformOrigin,
				'--slide-index': index,
				'--element-index': elementIndex,
				'--rotation': rotation * 25 + 'deg'
			}" :data-index="index">
			<div class="itemWrapper">
				<div class="img">
					<img :src="PATH + item.img" class="shadow">
					<img :src="PATH + item.img">
				</div>
				<big-title-comp :title="item.title">
					<div class="pagination">
						<span class="current">{{ index + 1 }}</span><span class="slash">/</span>{{ numberOfItems}}
					</div>
				</big-title-comp>
				<div class="subtitle">
					<h3>{{ $t('categories.like') }} <span v-html="item.athlete"></span></h3>
				</div>
			</div>
			<nuxt-link :to="{name: 'page', params: { slug: item.slug }}" class="callToAction">
				<button-comp :text="$t('discover')"></button-comp>
			</nuxt-link>
		</div>
	</li>
</template>
<script>
import BigTitleComp from '~/components/BigTitle';
import buttonComp from '~/components/Button';
export default {
	props: {
		item: {
			default: function() {
				return {};
			}
		},
		index: {
			default: 1
		},
		elementIndex: {
			default: 1
		},
		progression: {
			default: 1
		},
		numberOfItems: {
			default: 3
		}
	},
	data() {
		return {
			PATH: process.env.PATH,
			titleStatus: 'NOT_ANIMATED'
		};
	},
	mounted() {
		if (this.currentSlide === this.index) {
			this.showTitle();
		}
	},
	computed: {
		'direction': function() {
			return this.elementIndex < this.progression + 2 ? 1 : -1;
		},
		'transformOrigin': function() {
			return this.direction === 1 ? 'right' : 'left';
		},
		'rotation': function() {
			let progression = this.progression;
			if (this.elementIndex > this.numberOfItems + 1) {
				progression = this.progression - this.numberOfItems;
			} else if (this.elementIndex < 2) {
				progression = this.progression + this.numberOfItems;
			}
			let rotation = Math.min(Math.max(Math.abs(this.index - progression), 0), 1) * this.direction;
			return rotation;
		},
		'currentSlide': function() {
			return this.$store.getters.currentSlide;
		}
	},
	watch: {
		'progression': function(progression) {
			if (this.$route.name === 'index') {
				let difference = Math.abs(this.index - progression);
				if (this.index === 0 && this.progression > this.numberOfItems - 1) {
					difference = Math.abs(this.index - (progression - this.numberOfItems));
				} else if (this.index === this.numberOfItems - 1 && this.progression < 0) {
					difference = Math.abs(this.index - (progression + this.numberOfItems));
				}
				if (difference < 0.5) {
					if (this.titleStatus === 'NOT_ANIMATED') {
						this.showTitle();
					}
				} else if (this.titleStatus !== 'NOT_ANIMATED') {
					this.hideTitle();
				}
			}
		}
	},
	methods: {
		showTitle(duration = 0.8) {
			this.titleStatus = 'ANIMATING';
			const tl = new TimelineMax({
				onComplete: () => {
					this.titleStatus = 'ANIMATED';
				}
			});
			tl
			.to(this.$el.querySelector('.bigTitle'), duration, {
				'--y-offset': -0.035,
				ease: Power4.easeOut,
				overwrite: 'all'
			}, 0.04);
		},
		hideTitle(duration = 0.7) {
			this.titleStatus = 'NOT_ANIMATED';
			const tl = new TimelineMax();
			tl
			.to(this.$el.querySelector('.bigTitle'), duration, {
				'--y-offset': 0,
				ease: Power4.easeOut,
				overwrite: 'all'
			}, 0.04);
		}
	},
	components: {
		buttonComp,
		BigTitleComp
	}
};
</script>

<style lang="scss">
.selectorItem {
	position: relative;
	display: flex;
	height: var(--vh);
	width: calc(var(--vw) - calc(var(--item-margin) * 2));
	justify-content: center;
	align-items: center;
	flex-direction: column;
	transform-style: preserve-3d;
	--rotation: calc((var(--current-slide) - var(--index)) * 40deg);
	transform: perspective(500px) rotateY(var(--rotation));
	transform-origin: var(--transform-origin);
	.itemWrapper {
		position: relative;
		z-index: 3;
		.img {
			position: absolute;
			--imgTop: 45;
			top: calc(var(--imgTop) * 1%);
			left: 50%;
			transform: translate(-50%, -50%);
			img {
				transform: translate(calc(var(--x-offset) * 10% + var(--eased-mouse-position-percent-x) * 0.01%), calc(var(--y-offset) * 10% + var(--eased-mouse-position-percent-y) * 0.01%)) translateZ(0);
				z-index: 1;
				height: auto;
				width: 72vmin;
				height: 72vmin;
				object-fit: contain;
				display: block;
				filter: grayscale(1);
				transform-style: preserve-3d;
				pointer-events: none;
				position: relative;
				&.shadow {
					position: absolute;
					top: 50%;
					left: 50%;
					filter: grayscale(1) brightness(0);
					opacity: 0.15;
					transform: translate(calc(-50% + ((var(--x-offset) * 1% + var(--x-shadow-offset)) * 10) + (var(--eased-mouse-position-percent-x) * 0.02%)), calc(-50% + ((var(--y-offset) * 1% + var(--y-shadow-offset)) * 10) + (var(--eased-mouse-position-percent-y) * 0.02%))) scale(1.02) translateZ(0);
				}
			}
		}
		.titleWrapper {
			.pagination {
				position: absolute;
				left: 0;
				top: calc(5%);
				font-size: 1.2rem;
				transform-style: preserve-3d;
				font-weight: normal;
				font-family: 'Antonio';
				.current {
					font-size: 1.3em;
					font-weight: bold;
					transform: translateY(-10%);
				}
				.slash {
					margin: 0 0.3em;
				}
			}
		}
		.subtitle {
			position: absolute;
			right: 0;
			top: calc(48% + var(--title-top-offset) / 2 + ((-2% * var(--number-of-letters)) + 28%));
			color: white;
			clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
			@supports (-ms-ime-align: auto) {
				&:after {
					content: '';
					position: absolute;
					transition: background-color var(--background-transition-duration);
					background-color: var(--current-color);
					bottom: 100%;
					left: 50%;
					height: 150%;
					width: 150%;
					transform: rotate(-6deg) translateX(-50%);
				}
			}
			h3 {
				display: block;
				transform: translateY(-150%);
				transition: transform 0.5s var(--ease);
				font-size: 1rem;
				span {
					font-size: 1.3em;
				}
			}
		}
	}
	&.animated {
		.itemWrapper {
			&:hover {
				.subtitle {
					h3 {
						transform: none;
					}
				}
			}
		}
	}

	.callToAction {
		position: absolute;
		bottom: 10%;
		z-index: 4;
		user-select: initial;
		.buttonWrapper {
			--buttonColor: var(--background-color);
		}
	}
	.buttonComp {
		--transition-delay: var(--transition-speed);
	}
}
</style>
