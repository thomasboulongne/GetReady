<template>
	<div class="menu" :style="{backgroundColor: backgroundColor}" @mousemove="mouseMove">
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
			backgroundColor: this.items[0].color
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
		currentSlide: function(index) {
			this.backgroundColor = this.items[index].color;
		},
		'$store.getters.viewportSize': function() {
			this.onWindowResize();
		}
	},

	mounted() {
		this.camera = new THREE.PerspectiveCamera(55.3, window.innerWidth / window.innerHeight, 1, 5000);
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
	},

	methods: {
		mouseMove(e) {
			this.position.x = e.clientX;
			this.position.y = e.clientY;
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
			const title = document.createElement('h2');
			title.innerHTML = item.title;
			div.appendChild(title);
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
	.menuItem {
		h2 {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-family: 'Oswald';
			color: white;
			font-size: 15vmin;
			text-transform: uppercase;
			margin: 0;
		}
	}
}

</style>
