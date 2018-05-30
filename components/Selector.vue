<template>
	<div class="selector" @mousemove="mouseMove" :style="{backgroundColor: backgroundColor, '--transition-speed': transitionSpeed * 0.75 + 's', '--xPercent': xPercent.toFixed(2), '--yPercent': yPercent.toFixed(2), '--vw': vw + 'px', '--vh': vh + 'px', '--ratio': (vh / vw).toFixed(2)}">
		<ul class="hiddenSelector">
			<li v-for="(item, i) in items" :key="item.color + i">
				<div class="selectorItem" ref="items" :style="{'--backgroundColor': item.color, '--xOffset': item.shadow.x.toFixed(2) + '%', '--yOffset': item.shadow.y.toFixed(2) + '%'}">
					<img :src="item.img" class="shadow">
					<img :src="item.img">
					<div class="titleWrapper MTKnox">
						<h2 class="MTKnox">
							<div v-for="(letter, i) in item.title" :key="letter + i">
								<span class="letter">{{ letter }}</span>
							</div>
						</h2>
					</div>
					<div class="button">
						<div class="textWrapper">
							<span v-for="(letter, i) in $t('discover').split('')" :key="i">{{ i === 0 ? letter.toUpperCase() : letter }}</span>
						</div>
					</div>
				</div>
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
				x: 0,
				y: 0
			},
			progression: 0,
			backgroundColor: this.items[0].color,
			canSlide: true,
			transitionSpeed: 1
		};
	},

	computed: {
		xPercent: function() {
			return this.position.x * 100 / (this.vw || 1);
		},
		yPercent: function() {
			return this.position.y * 100 / (this.vh || 1);
		},
		step: function() {
			return 100 / this.numberOfItems;
		},
		currentSlide: function() {
			const i = Math.floor((this.progression - this.step / 2) / this.step) + 1;
			return i === this.numberOfItems ? 0 : i === -1 ? this.numberOfItems - 1 : i;
		},
		numberOfItems: function() {
			return this.items.length;
		},
		itemWidth: function() {
			return this.vw ? this.vw : process.browser ? window.innerWidth : 1;
		},
		apothem: function() {
			return this.itemWidth / (2 * Math.tan(Math.PI / this.items.length));
		},
		computedDegree: function() {
			return -(this.progression * 360 / 100);
		},
		computedRadian: function() {
			return this.computedDegree * Math.PI / 180;
		},
		vw: function() {
			return this.$store.getters.viewportSize.width;
		},
		vh: function() {
			return this.$store.getters.viewportSize.height;
		},
		fov: function() {
			const aspect = process.browser ? window.innerWidth / window.innerHeight : 1;
			let fov = 55;
			switch (this.numberOfItems) {
				case 3:
					fov = 1 / (Math.pow(1.7, aspect - 9.5)) + 28.7;
					break;
				case 4:
					fov = (1 / (Math.pow(2.21, aspect - 6.3)) + 23);
					break;
			}
			fov = fov * (this.vw / this.vw); // Hacky way to trigger recalculation on vw change
			return this.$route.query.fov ? this.$route.query.fov : fov;
		}
	},

	watch: {
		'currentSlide': function(index) {
			if (this.items[index]) {
				this.backgroundColor = this.items[index].color;
				const elementsArray = Array.from(this.$el.querySelectorAll('.threeDselector .selectorItem'));

				elementsArray.forEach(elt => {
					elt.classList.remove('currentSlide');
				});
				elementsArray[index].classList.add('currentSlide');
			}
		},
		'$store.getters.viewportSize': function() {
			this.onWindowResize();
		},
		'canSlide': function() {
			if (this.progression === 100) {
				this.progression = 0;
			} else if (this.progression < 0) {
				this.progression = 100 - this.step;
			}
		}
	},

	mounted() {
		this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.set(0, 0, this.apothem);
		this.scene = new THREE.Scene();
		this.group = new THREE.Group();
		this.scene.add(this.group);
		this.renderer = new THREE.CSS3DRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.items.forEach((item, i) => {
			const x = this.apothem * Math.sin(i * Math.PI * 2 / this.numberOfItems);
			const y = 0;
			const z = -(this.apothem * Math.cos(i * Math.PI * 2 / this.numberOfItems) - this.apothem);
			const ry = -i * (Math.PI * 2 / this.numberOfItems);
			this.group.add(this.createElement(this.$refs.items[i], x, y, z, ry));
		});

		this.renderer.domElement.classList.add('threeDselector');

		this.$el.appendChild(this.renderer.domElement);
		this.animate();

		this.$el.querySelector('.threeDselector .selectorItem').classList.add('currentSlide');
		this.addEventListeners();
	},

	beforeDestroy() {
		this.removeEventListeners();
	},

	methods: {
		addEventListeners() {
			window.addEventListener('keydown', this.keyboardEvent);
		},
		removeEventListeners() {
			window.removeEventListener('keydown', this.keyboardEvent);
		},
		keyboardEvent(event) {
			switch (event.key) {
				case 'ArrowLeft':
					this.prev();
					break;
				case 'ArrowRight':
					this.next();
					break;
			}
		},
		mouseMove(e) {
			TweenMax.to(this.position, 1.5, {
				x: e.clientX,
				y: e.clientY
			});
		},
		prev() {
			if (this.canSlide) {
				this.canSlide = false;
				const newX = this.progression - this.step;
				this.slide(newX);
			}
		},
		next() {
			if (this.canSlide) {
				this.canSlide = false;
				const newX = this.progression + this.step;
				this.slide(newX);
			}
		},
		slide(to) {
			const tl = new TimelineMax({
				paused: true,
				onComplete: () => {
					this.canSlide = true;
				}
			});
			tl
			.to(this, this.transitionSpeed, {
				ease: Power4.easeOut,
				progression: to
			})
			;
			tl.play();
		},
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.fov = this.fov;

			this.camera.updateProjectionMatrix();
			this.camera.position.set(0, 0, this.apothem);
			this.renderer.setSize(this.vw, this.vh);
			this.group.children.forEach((object, i) => {
				const x = this.apothem * Math.sin(i * Math.PI * 2 / this.numberOfItems);
				const y = 0;
				const z = -(this.apothem * Math.cos(i * Math.PI * 2 / this.numberOfItems) - this.apothem);
				object.position.set(x, y, z);
			});

			this.render();
		},
		createElement(div, x, y, z, ry) {
			const object = new THREE.CSS3DObject(div);
			object.position.set(x, y, z);
			object.rotation.y = ry;
			return object;
		},
		animate() {
			requestAnimationFrame(this.animate);
			this.camera.rotation.y = this.computedRadian;
			this.render();
		},
		render() {
			this.renderer.render(this.scene, this.camera);
		}
	}
};
</script>


<style lang="scss">
.selector {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	transition: background-color 0.4s;
	backface-visibility: hidden;
	.hiddenSelector {
		display: none;
	}
	.selectorItem {
		position: relative;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		transform-style: preserve-3d;
		&:before {
			content: '';
			display: block;
			height: 33%;
			width: 100%;
		}
		img {
			position: absolute;
			--imgTop: 45%;
			top: var(--imgTop);
			left: 50%;
			transform: translate(calc(-50% + var(--xPercent) * 0.01%), calc(-50% + var(--yPercent) * 0.01%));
			z-index: 1;
			height: auto;
			width: 70vmin;
			height: 70vmin;
			object-fit: contain;
			display: block;
			filter: grayscale(1);
			transform-style: preserve-3d;
			&.shadow {
				top: calc(var(--imgTop) + var(--yOffset));
				left: calc(50% + var(--xOffset));
				filter: grayscale(1) brightness(0);
				opacity: 0.15;
				transform: translate(calc(-50% + var(--xPercent) * 0.02%), calc(-50% + var(--yPercent) * 0.02%)) scale(1.02);
			}
		}
		.titleWrapper {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			flex-direction: column;
			color: white;
			height: 50%;
			@-moz-document url-prefix() {
				transform-style: preserve-3d;
			}
			h2 {
				font-size: 16vmax;
				margin: 0;
				white-space: nowrap;
				position: relative;
				display: block;
				--yOffset: -0.019em;
				@-moz-document url-prefix() {
					transform-style: preserve-3d;
				}
				div {
					display: inline-block;
					position: relative;
					z-index: 2;
					transform-style: preserve-3d;
					span {
						display: inline-block;
						transform-style: preserve-3d;
						transition: margin var(--transition-speed) var(--ease);
						--extraMargin: calc((var(--ratio) * 1.05 + 1) * 1vw);
						margin: 0 var(--extraMargin);
					}
					@for $i from 1 to 30 {
						&:nth-child(#{$i}) {
							span {
								transform: translateY(calc(#{$i} * var(--yOffset)));
							}
						}
					}
					& {
						&:nth-child(1) {
							z-index: 1;
						}
						&:nth-child(2) {
							z-index: 2;
						}
						&:nth-child(3) {
							z-index: 0;
						}
						&:nth-child(4) {
							z-index: 1;
						}
						&:nth-child(5) {
							z-index: 0;
						}
						&:nth-child(6) {
							z-index: 1;
						}
						&:nth-child(7) {
							z-index: 0;
						}
						&:nth-child(8) {
							z-index: 1;
						}
						&:nth-child(9) {
							z-index: 1;
						}
						&:nth-child(10) {
							z-index: 1;
						}
						&:nth-child(11) {
							z-index: 1;
						}
						&:nth-child(12) {
							z-index: 1;
						}
						&:nth-child(13) {
							z-index: 1;
						}
					}
				}
			}
			h3 {
				z-index: 2;
				.bigger {
					margin-left: 0.2em;
					font-size: 1.8em;
				}
			}
		}

		.button {
			flex-grow: 1;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.5rem;
			position: relative;
			z-index: 2;
			text-transform: uppercase;
			transform-style: preserve-3d;
			.textWrapper {
				transform-style: preserve-3d;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					top: 150%;
					left: 50%;
					height: 0.1em;
					width: 0;
					transition: width 0.4s calc(var(--transition-speed) * 1) var(--ease);
					transform: translate(-50%, -50%);
					background: rgba(0, 0, 0, 0.2);
				}
				span {
					display: inline-block;
					opacity: 0;
					transform: translateY(10%);
					transition-duration: 0.3s;
					transition-timing-function: var(--ease);
					transition-property: opacity, transform;
					--transition-delay: var(--transition-speed);
					@for $i from 1 to 20 {
						&:nth-child(#{$i}) {
							transition-delay: calc(var(--transition-delay) / 1.5 + (#{$i} * 0.03s));
						}
					}
				}
			}
		}
		&.currentSlide {
			.titleWrapper {
				h2 {
					div {
						span {
							margin: 0;
						}
						@for $i from 1 to 30 {
							&:nth-child(#{$i}) {
								span {
									transform: translateY(calc(#{$i} * var(--yOffset) + var(--yPercent) * 0.001em)) translateX(calc(var(--xPercent) * 0.001em));
								}
							}
						}
					}
				}
			}
			.button {
				.textWrapper {
					&:after {
						width: 33%;
					}
					span {
						opacity: 1;
						transform: none;
					}
				}
			}
		}
	}
}

</style>
