<template>
	<div :class="['selector', canSlide ? 'canAnimate' : '']" v-hammer:pan.horizontal="panGesture" @mousemove="mouseMove" :style="{
		'--currentColor': backgroundColor,
		'--transition-speed': transitionSpeed * 0.75 + 's',
		'--easedMousePositionPercentX': easedMousePositionPercent.x.toFixed(2),
		'--easedMousePositionPercentY': easedMousePositionPercent.y.toFixed(2),
		'--vw': vw + 'px',
		'--vh': vh + 'px',
		'--ratio': (vh / vw).toFixed(2)
	}">
		<ul class="hiddenSelector">
			<li v-for="(item, i) in items" :key="item.color + i">
				<div class="selectorItem" ref="items" :style="{
				'--backgroundColor': item.color,
				'--xOffset': item.shadow.x.toFixed(2) + '%',
				'--yOffset': item.shadow.y.toFixed(2) + '%',
				'--numberOfLetters': item.title.length
				}">
					<div class="itemWrapper">
						<img :src="item.img" class="shadow">
						<img :src="item.img">
						<div class="titleWrapper MTKnox">
							<h2 class="MTKnox">
								<div v-for="(letter, i) in item.title" :key="letter + i">
									<span class="letter">{{ letter }}</span>
								</div>
							</h2>
						</div>
						<div class="subtitle">
							<h3>{{ $t('categories.like') }} <span v-html="item.athlete"></span></h3>
						</div>
					</div>
					<div class="buttonWrapper">
						<div class="button">
							<nuxt-link :to="'/organize'" tag="div" class="textWrapper">
								<span v-t="'discover'"></span>
							</nuxt-link>
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
			mousePosition: {
				x: 0,
				y: 0
			},
			easedMousePosition: {
				x: 0,
				y: 0
			},
			rotation: Math.PI * 1.99,
			canSlide: false,
			transitionSpeed: 1,
			currentSlide: 0,
			navigationArrowsAreaWidth: 15,
			navigationIndicationSlide: 0.05
		};
	},

	computed: {
		mousePositionPercent: function() {
			return {
				x: this.mousePosition.x * 100 / (this.vw || 1),
				y: this.mousePosition.y * 100 / (this.vh || 1)
			};
		},
		easedMousePositionPercent: function() {
			return {
				x: this.easedMousePosition.x * 100 / (this.vw || 1),
				y: this.easedMousePosition.y * 100 / (this.vh || 1)
			};
		},
		progressionStep: function() {
			return 100 / this.numberOfItems;
		},
		rotationStep: function() {
			return Math.PI * 2 / this.numberOfItems;
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
		progression: function() {
			return (this.rotation * 100) / (Math.PI * 2);
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
					fov = 1 / (Math.pow(1.7, aspect - 9.5)) + 28;
					break;
				case 4:
					fov = (1 / (Math.pow(2.21, aspect - 6.3)) + 23);
					break;
			}
			fov = fov * (this.vw / this.vw); // Hacky way to trigger recalculation on vw change
			return this.$route.query.fov ? this.$route.query.fov : fov;
		},
		tempSlide: function() {
			let tempIndex = Math.round((Math.PI * 2 - this.rotation) / this.rotationStep);
			const tempSlide = tempIndex === this.items.length ? 0 : tempIndex < 0 ? this.items.length - 1 : tempIndex;
			return this.mod(tempSlide, this.numberOfItems);
		},
		backgroundColor: function() {
			// return this.items[0].color;
			return this.items[this.tempSlide].color;
		}
	},

	watch: {
		'currentSlide': function(index) {
			if (this.items[index]) {
				const elementsArray = Array.from(this.$el.querySelectorAll('.threeDselector .selectorItem'));

				elementsArray.forEach(elt => {
					elt.classList.remove('currentSlide');
				});
				elementsArray[index].classList.add('currentSlide');
			}
		},
		'tempSlide': function(tempSlide) {
			console.log(tempSlide, this.mod(tempSlide, this.numberOfItems));
		},
		'$store.getters.viewportSize': function() {
			this.onWindowResize();
		},
		'mousePositionPercent': function(position) {
			if (this.canSlide) {
				if (position.x > 100 - this.navigationArrowsAreaWidth) {
					this.navigationIndicationSlideLeft();
				} else if (position.x < this.navigationArrowsAreaWidth) {
					this.navigationIndicationSlideRight();
				} else {
					this.navigationIndicationSlideReset();
				}
			}
		}
	},

	mounted() {
		this.initThreeScene();
		this.addEventListeners();

		const duration = 2;
		TweenMax.to(this, duration, {
			directionalRotation: {
				useRadians: true,
				rotation: '0_short'
			},
			ease: Power4.easeOut
		});
		setTimeout(() => {
			this.canSlide = true;
		}, duration * 1000);
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
			this.mousePosition = {
				x: e.clientX,
				y: e.clientY
			};
			TweenMax.to(this.mousePosition, 1.5, {
				x: e.clientX,
				y: e.clientY
			});
		},
		navigationIndicationSlideLeft() {
			TweenMax.to(this, 1, {
				directionalRotation: {
					useRadians: true,
					rotation: ((this.numberOfItems - this.currentSlide) * this.rotationStep) - (this.rotationStep * this.navigationIndicationSlide) + '_short'
				},
				ease: Power4.easeOut
			});
		},
		navigationIndicationSlideRight() {
			TweenMax.to(this, 1, {
				directionalRotation: {
					useRadians: true,
					rotation: ((this.numberOfItems - this.currentSlide) * this.rotationStep) + (this.rotationStep * this.navigationIndicationSlide) + '_short'
				},
				ease: Power4.easeOut
			});
		},
		navigationIndicationSlideReset() {
			TweenMax.to(this, 1, {
				directionalRotation: {
					useRadians: true,
					rotation: (this.numberOfItems - this.currentSlide) * this.rotationStep + '_short'
				},
				ease: Power4.easeOut
			});
		},
		panGesture(e) {
			if (e.isFinal) {
				this.canSlide = true;
				switch (e.offsetDirection) {
					case 2:
						this.next();
						break;
					case 4:
						this.prev();
						break;
					default:

						break;
				}
			} else {
				this.canSlide = false;
				switch (e.offsetDirection) {
					case 2:
						this.navigationIndicationSlideLeft();
						break;
					case 4:
						this.navigationIndicationSlideRight();
						break;
				}
			}
		},
		initThreeScene() {
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
		},
		prev() {
			if (this.canSlide) {
				this.canSlide = false;
				const newRotation = ((this.numberOfItems - this.currentSlide) * this.rotationStep) + this.rotationStep;
				this.currentSlide = (this.currentSlide - 1) < 0 ? this.items.length - 1 : this.currentSlide - 1;
				this.slide(newRotation);
			}
		},
		next() {
			if (this.canSlide) {
				this.canSlide = false;
				const newRotation = ((this.numberOfItems - this.currentSlide) * this.rotationStep) - this.rotationStep;
				this.currentSlide = (this.currentSlide + 1) > this.items.length - 1 ? 0 : this.currentSlide + 1;
				this.slide(newRotation);
			}
		},
		slide(to) {
			return new Promise(resolve => {
				const tl = new TimelineMax({
					paused: true,
					onComplete: () => {
						this.canSlide = true;
						resolve();
					}
				});
				tl
				.to(this, this.transitionSpeed, {
					directionalRotation: {
						useRadians: true,
						rotation: to + '_short'
					},
					ease: Power4.easeOut
				})
				;
				tl.play();
			});
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
			this.camera.rotation.y = this.rotation;
			this.render();
		},
		render() {
			this.renderer.render(this.scene, this.camera);
		},
		mod(n, m) {
			return ((n % m) + m) % m;
		}
	}
};
</script>


<style lang="scss">
.selector {
	height: var(--vh);
	width: var(--vw);
	--backgroundTransitionDuration: 0.4s;
	transition: background-color var(--backgroundTransitionDuration);
	background-color: var(--currentColor);
	cursor: url(~/assets/images/drag.png), auto;
	.hiddenSelector {
		display: none;
	}
	.selectorItem {
		position: relative;
		height: var(--vh);
		width: var(--vw);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		transform-style: preserve-3d;
		.itemWrapper {
			position: relative;
			z-index: 3;
			img {
				position: absolute;
				--imgTop: 45%;
				top: var(--imgTop);
				left: 50%;
				transform: translate(calc(-50% + var(--easedMousePositionPercentX) * 0.01%), calc(-50% + var(--easedMousePositionPercentY) * 0.01%));
				z-index: 1;
				height: auto;
				width: 70vmin;
				height: 70vmin;
				object-fit: contain;
				display: block;
				filter: grayscale(1);
				transform-style: preserve-3d;
				pointer-events: none;
				&.shadow {
					top: calc(var(--imgTop) + var(--yOffset));
					left: calc(50% + var(--xOffset));
					filter: grayscale(1) brightness(0);
					opacity: 0.15;
					transform: translate(calc(-50% + var(--easedMousePositionPercentX) * 0.02%), calc(-50% + var(--easedMousePositionPercentY) * 0.02%)) scale(1.02);
				}
			}
			.titleWrapper {
				display: flex;
				justify-content: center;
				align-items: flex-end;
				flex-direction: column;
				color: white;
				height: 50%;
				pointer-events: none;
				--titleWrapperDelay: 2s;
				@-moz-document url-prefix() {
					transform-style: preserve-3d;
				}
				h2 {
					font-size: 16vmax;
					margin: 0;
					white-space: nowrap;
					position: relative;
					display: block;
					--yOffset: -0.035em;
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
						}
						@for $i from 1 to 30 {
							&:nth-child(#{$i}) {
								span {
									transition: transform calc(var(--transition-speed) * 1.15) var(--ease) calc(#{$i} * 0.03s);
								}
							}
						}
					}
				}
			}
			.subtitle {
				position: absolute;
				right: 0;
				top: calc(48% + ((-2% * var(--numberOfLetters)) + 28%));
				color: white;
				&:after {
					content: '';
					position: absolute;
					background-color: var(--currentColor);
					transition: background-color var(--backgroundTransitionDuration);
					bottom: 100%;
					left: 50%;
					height: 150%;
					width: 150%;
					transform: rotate(-6deg) translateX(-50%);
				}
				h3 {
					display: block;
					transform: translateY(-150%);
					transition: transform 0.5s var(--ease);
					span {
						font-size: 1.3em;
					}
				}
			}
		}

		.buttonWrapper {
			position: absolute;
			bottom: 10%;
			left: 50%;
			transform: translateX(-50%);
			transform-style: preserve-3d;
			z-index: 2;
			--transition-delay: var(--transition-speed);
			&:before, &:after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 120%;
				height: 100%;
				background-color: var(--currentColor);
				transition: background-color var(--backgroundTransitionDuration), transform calc(var(--transition-speed) * 1.3) var(--ease) var(--transition-delay);
				z-index: 1;
			}
			&:before {
				transform: translate(-50%, -99%) rotate(-6deg);
			}
			&:after {
				transform: translate(-50%, -1%) rotate(-6deg);
			}
			.button {
				position: relative;
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1rem;
				text-transform: uppercase;
				transform-style: preserve-3d;
				.textWrapper {
					transform-style: preserve-3d;
					position: relative;
					cursor: pointer;
					border: solid 1px white;
					padding: 0.7em 3em;
					border-radius: 10em;
					span {
						display: inline-block;
						opacity: 0;
						transform: translateY(10%);
						transition-duration: 0.3s;
						transition-timing-function: var(--ease);
						transition-property: opacity, transform;
						@for $i from 1 to 20 {
							&:nth-child(#{$i}) {
								transition-delay: calc(var(--transition-delay) / 1.5 + (#{$i} * 0.03s));
							}
						}
					}
				}
			}
		}
		&.currentSlide {
			.itemWrapper {
				.titleWrapper {
					--titleWrapperDelay: 0s;
					h2 {
						div {
							@for $i from 1 to 30 {
								&:nth-child(#{$i}) {
									span {
										transform: translateY(calc(#{$i} * var(--yOffset)));
									}
								}
							}
						}
					}
				}
			}
			.buttonWrapper {
				&:before {
					transform: translate(-50%, -200%) rotate(-6deg);
				}
				&:after {
					transform: translate(-50%, 100%) rotate(-6deg);
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

	&.canAnimate {
		.selectorItem {
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
	}
}

</style>
