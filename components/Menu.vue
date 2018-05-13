<template>
	<div class="menu" @mousemove="mouseMove" :style="{backgroundColor: backgroundColor, '--transition-speed': transitionSpeed * 0.75 + 's'}">
		<ul class="hiddenMenu">
			<li v-for="(item, i) in items" :key="item.color + i">
				<div class="itemWrapper">
					<div class="imgWrapper">
						<img :src="item.img" alt="">
					</div>
					<div class="letterWrapper" v-html="item.title"></div>
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
			backgroundColor: this.items[0].color,
			canSlide: true,
			transitionSpeed: 1,
			mouseControl: false
		};
	},

	computed: {
		xPercent: function() {
			return (this.position.x * 100 / (this.$store.getters.viewportSize.width || 1)) * (100 / this.numberOfItems) * (this.numberOfItems - 1) / 100;
		},
		yPercent: function() {
			return this.position.y * 100 / (this.$store.getters.viewportSize.height || 1);
		},
		step: function() {
			return 100 / this.numberOfItems;
		},
		currentSlide: function() {
			const i = Math.floor((this.xPercent - this.step / 2) / this.step) + 1;
			return i === this.numberOfItems ? 0 : i === -1 ? this.numberOfItems - 1 : i;
		},
		numberOfItems: function() {
			return this.items.length;
		},
		itemWidth: function() {
			return this.$store.getters.viewportSize.width ? this.$store.getters.viewportSize.width : process.browser ? window.innerWidth : 1;
		},
		apothem: function() {
			return this.itemWidth / (2 * Math.tan(Math.PI / this.items.length));
		},
		computedDegree: function() {
			return -(this.xPercent * 360 / 100);
		},
		computedRadian: function() {
			return this.computedDegree * Math.PI / 180;
		}
	},

	watch: {
		'currentSlide': function(index) {
			this.backgroundColor = this.items[index].color;
			const elementsArray = Array.from(this.$el.querySelectorAll('.menuItem'));
			elementsArray.forEach(elt => {
				elt.classList.remove('currentSlide');
			});
			elementsArray[index].classList.add('currentSlide');
		},
		'$store.getters.viewportSize': function() {
			this.onWindowResize();
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
			this.group.add(this.createElement(item, x, y, z, ry));
		});

		this.$el.appendChild(this.renderer.domElement);
		this.animate();

		this.$el.querySelector('.menuItem').classList.add('currentSlide');

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
			if (this.mouseControl) {
				this.position.x = e.clientX;
				this.position.y = e.clientY;
			}
		},
		prev() {
			if (this.position.x > 0 && this.canSlide) {
				this.canSlide = false;
				const newX = this.position.x - this.$store.getters.viewportSize.width / (this.numberOfItems - 1);
				this.slide(newX);
			}
		},
		next() {
			if (this.position.x < this.$store.getters.viewportSize.width && this.canSlide) {
				this.canSlide = false;
				const newX = this.position.x + this.$store.getters.viewportSize.width / (this.numberOfItems - 1);
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
			.to(this.position, this.transitionSpeed, {
				ease: Power4.easeOut,
				x: to
			})
			;
			tl.play();
		},
		onWindowResize() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.camera.position.set(0, 0, this.apothem);
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.group.children.forEach((object, i) => {
				const x = this.apothem * Math.sin(i * Math.PI * 2 / this.numberOfItems);
				const y = 0;
				const z = -(this.apothem * Math.cos(i * Math.PI * 2 / this.numberOfItems) - this.apothem);
				object.position.set(x, y, z);
			});

			this.render();
		},
		createElement(item, x, y, z, ry) {
			const div = document.createElement('div');
			div.classList.add('menuItem');
			div.style.width = '100vw';
			div.style.height = '100vh';

			// Image
			const img = document.createElement('img');
			img.src = item.img;
			div.appendChild(img);

			// Title
			const titleWrapper = document.createElement('div');
			titleWrapper.classList.add('titleWrapper');
			const title = document.createElement('h2');
			title.style.setProperty('--backgroundColor', item.color);
			const letters = item.title.replace(' ', ' ').split('');
			letters.forEach(letter => {
				const letterWrapperElement = document.createElement('div');
				const letterElement = document.createElement('span');
				letterElement.classList.add('letter');
				letterElement.innerHTML = letter;
				letterWrapperElement.innerHTML = letterElement.outerHTML;
				title.appendChild(letterWrapperElement);
			});
			titleWrapper.appendChild(title);
			div.appendChild(titleWrapper);

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
		visibility: hidden;
		position: absolute;
		pointer-events: none;
	}
	.menuItem {
		position: relative;
		img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			height: 70%;
			width: 50%;
			object-fit: contain;
			display: block;
		}
		.titleWrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			--margin: 33%;
			height: calc(100% - var(--margin));
			top: var(--margin);
			position: absolute;
			left: 0;
			width: 100%;
			h2 {
				font-family: 'Oswald';
				color: white;
				font-size: 18vmin;
				text-transform: uppercase;
				margin: 0;
				white-space: nowrap;
				position: relative;
				display: block;
				&:after {
					// content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: var(--backgroundColor);
					clip-path: polygon(0% 100%, 100% 75%, 100% 100%);
					z-index: 3;
				}
				div {
					display: inline-block;
					position: relative;
					span {
						display: inline-block;
						transition: margin var(--transition-speed) cubic-bezier(0.165, 0.84, 0.44, 1);
						margin: 0 30px;
					}
					@for $i from 1 to 100 {
						&:nth-child(#{$i}) {
							span {
								transform: translateY(random($limit: 15%) - 5%);
							}
						}
					}
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
		&.currentSlide {
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
