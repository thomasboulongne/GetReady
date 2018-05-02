<template>
	<div class="menu" @mousemove="mouseMove" :style="{'--x-percent': xPercent + '%', '--y-percent': yPercent + '%', '--x': xPercent, '--y': yPercent, '--numberOfItems': items.length }">
		<ul class="items">
			<li v-for="(item, i) in items" :key="item.color" class="item" :style="{'--color': item.color, '--index': i}">
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
			return this.position.x * 100 / this.$store.getters.viewportSize.width;
		},
		yPercent: function() {
			return this.position.y * 100 / this.$store.getters.viewportSize.height;
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
		transform-origin: 50% 50% 50rem;
		// perspective-origin: var(--x-percent) var(--y-percent);
		--computedPercent: calc((var(--x-percent) * (100 / var(--numberOfItems) * (var(--numberOfItems) - 1))) / 100);
		--computedDegree: calc((var(--x) * (360 / var(--numberOfItems) * (var(--numberOfItems) - 1))) / 360);
		// transform: translateX(calc(var(--computedPercent) * -1));
		transform: rotateY(calc(var(--computedDegree) * 1deg));
		position: relative;
		.item {
			position: absolute;
			top: 0;
			left: 0;
			background: var(--color);
			display: inline-block;
			overflow: hidden;
			backface-visibility: hidden;
			transform: translate3d();
			width: 100%;
			height: 100%;

			&:nth-child(2) {
				transform: translate3d(100%, 0, 50vw) rotateY(-90deg);
			}

			&:nth-child(3) {
				transform: translate3d(0, 0, 100vw) rotateY(-180deg);
			}

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
					transform: translate(-50%, -50%) translateZ(-50px); // rotateY(calc(((20deg * var(--x) / 100) - 10deg))) rotateX(calc(((20deg * var(--y) / 100) - 10deg)))
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
								transform: translateY(random($limit: 20%) - 10%) translateZ(random($limit: 20px) - 30px); // rotateY(calc(((45deg * var(--x) / 100) - 22.5deg))) rotateX(calc(((45deg * var(--y) / 100) - 22.5deg)))
							}
						}
					}
				}
			}
		}
	}
}

</style>
