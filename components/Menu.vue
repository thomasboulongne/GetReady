<template>
	<div class="menu" @mousemove="mouseMove" :style="{backgroundColor: backgroundColor, '--transition-speed': transitionSpeed * 0.75 + 's', '--xPercent': xPercent, '--yPercent': yPercent, '--vw': vw + 'px', '--vh': vh + 'px'}">
		<ul class="hiddenMenu">
			<li v-for="(item, i) in items" :key="item.color + i">
				<div class="menuItem" ref="items" :style="{'--backgroundColor': item.color, '--xOffset': item.x + '%', '--yOffset': item.y + '%'}">
					<img :src="item.img" class="shadow">
					<img :src="item.img">
					<div class="titleWrapper">
						<h2>
							<div v-for="(letter, i) in item.title" :key="letter + i">
								<span class="letter">{{ letter }}</span>
							</div>
						</h2>
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
		}
	},

	watch: {
		'currentSlide': function(index) {
			if (this.items[index]) {
				this.backgroundColor = this.items[index].color;
				const elementsArray = Array.from(this.$el.querySelectorAll('.threeDmenu .menuItem'));

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
		this.camera = new THREE.PerspectiveCamera(55.3, window.innerWidth / window.innerHeight, 1, 1000);
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

		this.renderer.domElement.classList.add('threeDmenu');

		this.$el.appendChild(this.renderer.domElement);
		this.animate();

		this.$el.querySelector('.threeDmenu .menuItem').classList.add('currentSlide');

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
			TweenMax.to(this.position, 10, {
				x: e.clientX,
				y: e.clientY,
				ease: Elastic.easeOut.config(1.75, 1)
			});
		},
		prev() {
			if (this.canSlide) { // this.progression > 0
				this.canSlide = false;
				const newX = this.progression - this.step;
				this.slide(newX);
			}
		},
		next() {
			if (this.canSlide) { // this.progression < this.step * (this.numberOfItems - 1)
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
@import '~assets/scss/variables.scss';
.menu {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	transition: background-color 0.4s;
	.hiddenMenu {
		display: none;
	}
	.menuItem {
		perspective: 0;
		position: relative;
		height: 100vh;
		width: 100vw;
		--ease: cubic-bezier(0.165, 0.84, 0.44, 1);
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(calc(-50% + var(--xPercent) * 0.01%), calc(-50% + var(--yPercent) * 0.01%));
			z-index: 1;
			height: auto;
			width: 30vw;
			height: 30vw;
			object-fit: contain;
			display: block;
			filter: grayscale(1);
			&.shadow {
				top: calc(50% + var(--yOffset));
				left: calc(50% + var(--xOffset));
				filter: grayscale(1) brightness(0);
				opacity: 0.3;
				transform: translate(calc(-50% + var(--xPercent) * 0.02%), calc(-50% + var(--yPercent) * 0.02%)) scale(1.02);
			}
		}
		.titleWrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			flex-direction: column;
			position: absolute;
			left: 0;
			width: 100%;
			&:before {
				content: '';
				height: 33%;
			}
			h2 {
				font-family: 'Oswald';
				color: white;
				font-size: 10vw;
				text-transform: uppercase;
				margin: 0;
				white-space: nowrap;
				position: relative;
				display: block;
				div {
					display: inline-block;
					position: relative;
					span {
						display: inline-block;
						transition: margin var(--transition-speed) var(--ease);
						margin: 0 30px;
					}
					@for $i from 1 to 100 {
						&:nth-child(#{$i}) {
							span {
								transform: translateY(calc(#{random($limit: 15%) - 5%} + var(--yPercent) * 0.001em)) translateX(calc(var(--xPercent) * 0.001em));
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
		}
		&:before {
			content: '';
			width: 30vw;
			height: 30vw;
			border-radius: 50%;
			box-shadow: 0 0 2vw 0 rgba(0, 0, 0, 0.2);
			background-color: var(--backgroundColor);
			position: absolute;
			left: 55%;
			top: 33%;
			transform: translate(-50%, -50%) scale(0.6);
			transition: transform var(--transition-speed) var(--ease);
		}
		&.currentSlide {
			&:before {
				transform: translate(-50%, -50%) scale(1);
			}
			.titleWrapper {
				h2 {
					span {
						margin: 0;
					}
				}
			}
		}
	}
}

</style>
