<template>
	<div class="study">
		<div :class="['canvasWrapper', canvasPosition]" ref="canvasWrapper"></div>
		<div class="steps"><h1>Step</h1></div>
		<div class="steps"><h1>Step</h1></div>
		<div class="steps"><h1>Step</h1></div>
		<div class="steps"><h1>Step</h1></div>
		<div class="steps"><h1>Step</h1></div>
	</div>
</template>
<script>
export default {
	props: {
		study: {
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			canvasPosition: ''
		};
	},
	computed: {
		vh: function() {
			return this.$store.getters.viewportSize.height;
		}
	},
	watch: {
		'$store.getters.scrollPosition.y': function() {
			this.updateCanvasPosition();
		}
	},
	mounted() {
		this.init3dScene();
		this.updateCanvasPosition();
	},
	methods: {
		init3dScene() {
			const loader = new THREE.OBJLoader();
			this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
			this.camera.position.set(this.study.CameraSpline[0][0], this.study.CameraSpline[0][1], this.study.CameraSpline[0][2]);
			this.scene = new THREE.Scene();
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.camera.lookAt(this.study.TargetSpline[0][0], this.study.TargetSpline[0][1], this.study.TargetSpline[0][2]);
			const textureLoader = new THREE.TextureLoader();
			this.texture = textureLoader.load(this.study.Texture);
			loader.load(
				this.study.Obj,
				object => {
					this.court = object;
					this.court.children[0].material = new THREE.MeshBasicMaterial();
					this.court.children[0].material.map = this.texture;
					this.scene.add(this.court);
				}
			);
			this.scene.background = new THREE.Color(0x6F88EE);
			this.$refs.canvasWrapper.appendChild(this.renderer.domElement);
			this.animate();
		},
		animate() {
			requestAnimationFrame(this.animate);
			this.render();
		},
		render() {
			this.renderer.render(this.scene, this.camera);
		},
		updateCanvasPosition() {
			if (this.$el.getBoundingClientRect().bottom <= this.vh) {
				this.canvasPosition = 'below';
			} else if (this.$el.getBoundingClientRect().top <= 0) {
				this.canvasPosition = 'fixed';
			} else {
				this.canvasPosition = '';
			}
		}
	}
};
</script>
<style lang="scss">
.study {
	position: relative;
	.steps {
		position: relative;
		height: 100vh;
	}
	.canvasWrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		&.fixed {
			position: fixed;
		}
		&.below {
			top: auto;
			bottom: 0;
		}
	}
}
</style>
