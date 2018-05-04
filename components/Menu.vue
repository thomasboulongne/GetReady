<template>
	<div class="menu" @mousemove="mouseMove" :style="{'--x-percent': xPercent + '%', '--y-percent': yPercent + '%', '--x': xPercent, '--y': yPercent, '--numberOfItems': numberOfItems }">
		<ul class="items" :style="{width: itemWidth, '--computedDegree': computedDegree, '--apothem': apothem + 'px'}">
			<li v-for="(item, i) in items" :key="item.color" class="item" :style="{
				'--color': item.color,
				'--index': i,
				'--selfAngle': -(i * (360 / numberOfItems) + computedDegree) + 'deg',
				'--self-x': (apothem * Math.sin(i * Math.PI * 2 / numberOfItems + computedRadian)) + 'px',
				'--self-z': -(apothem * Math.cos(i * Math.PI * 2 / numberOfItems + computedRadian) - apothem) + 'px'
			}">
				<div class="imgWrapper">
					<img :src="item.img" alt="">
				</div>
				<div class="letterWrapper" v-html="'<div><span>' + item.title.replace(' ', ' ').split('').join('</span></div><div><span>') + '</span></div>'"></div>
			</li>
		</ul>
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
			position: {
				x: process.browser ? window.innerWidth / 2 : 0,
				y: process.browser ? window.innerHeight / 2 : 0
			}
		};
	},

	computed: {
		xPercent: function() {
			// return 10;
			return this.position.x * 100 / (this.$store.getters.viewportSize.width || 1);
		},
		yPercent: function() {
			return this.position.y * 100 / (this.$store.getters.viewportSize.height || 1);
		},
		itemWidth: function() {
			return this.$store.getters.viewportSize.width ? this.$store.getters.viewportSize.width : process.browser ? window.innerWidth : 1;
		},
		apothem: function() {
			return this.itemWidth / (2 * Math.tan(Math.PI / this.items.length));
		},
		numberOfItems: function() {
			return this.items.length;
		},
		computedDegree: function() {
			return (this.xPercent * 360 / 100);
		},
		computedRadian: function() {
			return this.computedDegree * Math.PI / 180;
		}
	},

	methods: {
		mouseMove(e) {
			this.position.x = e.clientX;
			this.position.y = e.clientY;
		}
	}
};
</script>


<style lang="scss">
@import '~assets/scss/variables.scss';

.menu {
	&:after {
		content: '';
		position: absolute;
		display: block;
		background-color: seagreen;
		height: 1em;
		width: 1em;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		top: var(--y-percent);
		left: var(--x-percent);
		z-index: 99999999999999;
	}
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	.items {
		&:after {
			content: '';
			position: absolute;
			display: block;
			background-color: aqua;
			height: 1em;
			width: 1em;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			top: 50%;
			left: 50%;
			z-index: 99999999999999;
		}
		width: 100vw;
		height: 100vh;
		display: inline-block;
		overflow: auto;
		white-space: nowrap;
		perspective: 300px;
		position: relative;
		.item {
			position: absolute;
			top: 0;
			left: 0;
			background: var(--color);
			display: inline-block;
			overflow: hidden;
			backface-visibility: hidden;
			width: 100%;
			height: 100%;
			transform-style: preserve-3d;
			transform: rotateY(var(--selfAngle)) translate3d(var(--self-x), 0, calc(var(--self-z)));

			.imgWrapper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				img {
					position: absolute;
					width: 50vw;
					max-height: 80vh;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%); // rotateY(calc(((20deg * var(--x) / 100) - 10deg))) rotateX(calc(((20deg * var(--y) / 100) - 10deg)))
					filter: grayscale(1);
				}
			}
			.letterWrapper {
				font-family: 'Oswald';
				color: white;
				font-size: 10rem;
				text-transform: uppercase;
				position: relative;
				width: 100%;
				height: 100% ;
				display: flex;
				justify-content: center;
				align-items: center;
				padding-top: 7%;
				top: 0;
				left: 0;
				div {
					display: inline-block;
					position: relative;
					@for $i from 1 to 100 {
						&:nth-child(#{$i}) {
							z-index: random($limit: 3) - 1;
							span {
								display: inline-block;
								transform-style: preserve-3d;
								transform: translateY(random($limit: 20%) - 10%); // rotateY(calc(((45deg * var(--x) / 100) - 22.5deg))) rotateX(calc(((45deg * var(--y) / 100) - 22.5deg)))
							}
						}
					}
				}
			}
		}
	}
}

</style>
