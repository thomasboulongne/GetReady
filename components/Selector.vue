<template>
	<div :class="['selector', canSlide ? 'canAnimate' : '']" v-hammer:pan.horizontal="panGesture" @mousemove="mouseMove" :style="{
		'--currentColor': backgroundColor,
		'--transition-speed': transitionSpeed * 0.75 + 's',
		'--easedMousePositionPercentX': easedMousePositionPercent.x.toFixed(2),
		'--easedMousePositionPercentY': easedMousePositionPercent.y.toFixed(2),
		'--vw': vw + 'px',
		'--vh': vh + 'px',
		'--ratio': (vh / vw).toFixed(2),
		'--backgroundTransitionDuration': backgroundTransitionDuration + 's',
		'--navigationArrowsAreaWidth': navigationArrowsAreaWidth + '%',
		'cursor': cursor
	}">
		<ul class="hiddenSelector">
			<li v-for="(item, i) in items" :key="item.color + i">
				<div class="selectorItem" ref="items" :style="{
				'--backgroundColor': item.color,
				'--xOffset': item.position.x.toFixed(2) + '%',
				'--yOffset': item.position.y.toFixed(2) + '%',
				'--xShadowOffset': item.shadow.x.toFixed(2) + '%',
				'--yShadowOffset': item.shadow.y.toFixed(2) + '%',
				'--numberOfLetters': item.title.length
				}">
					<div class="itemWrapper">
						<div class="img">
							<img :src="item.img" class="shadow">
							<img :src="item.img">
						</div>
						<big-title-comp :title="item.title">
							<div class="pagination">
								<span>{{ i + 1 }}</span>/{{ numberOfItems}}
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
		</ul>
		<div class="nav">
			<div class="left" @click="prev">
				<div class="arrow">
					<img src="~/assets/images/arrow.svg"/>
				</div>
			</div>
			<div class="right" @click="next">
				<div class="arrow">
					<img src="~/assets/images/arrow.svg"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import buttonComp from '~/components/Button';
import BigTitleComp from '~/components/BigTitle';
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
			rotation: 0,
			canSlide: false,
			transitionSpeed: 1,
			currentSlide: 0,
			navigationArrowsAreaWidth: 15,
			navigationIndicationSlide: 0.02,
			backgroundTransitionDuration: 0.4,
			cursor: '-webkit-grab'
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
			return this.items[this.tempSlide].color;
		}
	},

	watch: {
		'currentSlide': function(index) {
			if (this.items[index]) {
				const elementsArray = Array.from(this.$el.querySelectorAll('.threeDselector .selectorItem'));

				elementsArray.forEach(elt => {
					elt.classList.remove('currentSlide');
					elt.querySelector('.buttonComp').classList.remove('show');
				});
				elementsArray[index].classList.add('currentSlide');
				elementsArray[index].querySelector('.buttonComp').classList.add('show');
			}
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
		},
		'easedMousePositionPercent': function(position) {
			this.$store.dispatch('updateMousePosition', position);
		}
	},

	mounted() {
		this.initThreeScene();
		this.addEventListeners();
		this.canSlide = this.$route.name === 'index';
		this.backgroundTransitionDuration = 0.4;
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
			TweenMax.to(this.easedMousePosition, 1.5, {
				x: e.clientX,
				y: e.clientY
			});
		},
		navigationIndicationSlideLeft() {
			TweenMax.to(this, 1.2, {
				directionalRotation: {
					useRadians: true,
					rotation: ((this.numberOfItems - this.currentSlide) * this.rotationStep) - (this.rotationStep * this.navigationIndicationSlide) + '_short'
				},
				ease: Power2.easeOut
			});
		},
		navigationIndicationSlideRight() {
			TweenMax.to(this, 1.2, {
				directionalRotation: {
					useRadians: true,
					rotation: ((this.numberOfItems - this.currentSlide) * this.rotationStep) + (this.rotationStep * this.navigationIndicationSlide) + '_short'
				},
				ease: Power2.easeOut
			});
		},
		navigationIndicationSlideReset() {
			TweenMax.to(this, 1.2, {
				directionalRotation: {
					useRadians: true,
					rotation: (this.numberOfItems - this.currentSlide) * this.rotationStep + '_short'
				},
				ease: Power2.easeOut
			});
		},
		panGesture(e) {
			if (e.isFinal) {
				this.canSlide = true;
				this.cursor = '-webkit-grab';
				switch (e.offsetDirection) {
					case 2:
						this.next();
						break;
					case 4:
						this.prev();
						break;
				}
			} else {
				this.canSlide = false;
				this.cursor = '-webkit-grabbing';
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
		spinAnimation() {
			this.rotation = Math.PI * 1.5;
			return new Promise(resolve => {
				TweenMax.to(this, 2.5, {
					directionalRotation: {
						useRadians: true,
						rotation: '0'
					},
					ease: Power4.easeOut,
					onComplete: () => {
						this.backgroundTransitionDuration = 0.4;
						this.canSlide = true;
						resolve();
					}
				});
			});
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
			this.$el.querySelector('.threeDselector .selectorItem').querySelector('.buttonComp').classList.add('show');
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
	},

	components: {
		buttonComp,
		BigTitleComp
	}
};
</script>


<style lang="scss">
.selector {
	height: var(--vh);
	width: var(--vw);
	transition: background-color var(--backgroundTransitionDuration);
	background-color: var(--currentColor);
	cursor: grab;
	.nav {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		.left, .right {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: var(--navigationArrowsAreaWidth);
			pointer-events: all;
			cursor: w-resize;
			display: flex;
			align-items: flex-end;
			justify-content: flex-start;
			padding: 7vh 5vw;
			box-sizing: border-box;
		}
		.right {
			left: auto;
			right: 0;
			justify-content: flex-end;
			cursor: e-resize;
			img {
				transform: scale(-1);
			}
		}
	}
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
			.img {
				position: absolute;
				--imgTop: 45%;
				top: var(--imgTop);
				left: 50%;
				transform: translate(-50%, -50%);
				img {
					transform: translate(calc(var(--xOffset) * 10 + var(--easedMousePositionPercentX) * 0.01%), calc(var(--yOffset) * 10 + var(--easedMousePositionPercentY) * 0.01%));
					z-index: 1;
					height: auto;
					width: 80vmin;
					height: 80vmin;
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
						transform: translate(calc(-50% + (var(--xShadowOffset) * 10) + (var(--easedMousePositionPercentX) * 0.02%)), calc(-50% + (var(--yShadowOffset) * 10) + (var(--easedMousePositionPercentY) * 0.02%))) scale(1.02);
					}
				}
			}
			.titleWrapper {
				.pagination {
					position: absolute;
					left: 0;
					top: calc(5%);
					font-size: 2rem;
					transform-style: preserve-3d;
					font-weight: normal;
					span {
						font-size: 1.3em;
						font-weight: bold;
						transform: translateY(-10%);
					}
				}
			}
			.subtitle {
				position: absolute;
				right: 0;
				top: calc(48% + var(--titleTopOffset) / 2 + ((-2% * var(--numberOfLetters)) + 28%));
				color: white;
				clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
				@supports (-ms-ime-align: auto) {
					&:after {
						content: '';
						position: absolute;
						transition: background-color var(--backgroundTransitionDuration);
						background-color: var(--currentColor);
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
					span {
						font-size: 1.3em;
					}
				}
			}
		}

		.callToAction {
			position: absolute;
			bottom: 10%;
			.buttonWrapper {
				--buttonColor: var(--backgroundColor);
			}
		}
		.buttonComp {
			--transition-delay: var(--transition-speed);
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
