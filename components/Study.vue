<template>
	<div :class="['study', canvasPosition]">
		<div :class="['canvasWrapper']" ref="canvasWrapper"></div>
		<div class="step">
			<div class="stepWrapper" ref="step1">
				<h1>Step</h1>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step2">
				<h1>Step</h1>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step3">
				<h1>Step</h1>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step4">
				<h1>Step</h1>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step5">
				<h1>Step</h1>
			</div>
		</div>
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
			canvasPosition: '',
			scrollPercentage: 0,
			animationPercentage: 0,
			stepsElm: []
		};
	},
	computed: {
		vh: function() {
			return this.$store.getters.viewportSize.height;
		},
		stepsNumber: function() {
			return this.stepsElm.length;
		},
		stepPercentage: function() {
			return 100 / (this.stepsNumber - 1);
		},
		currentStep: function() {
			for (let step = 0; step < this.stepsNumber; step++) {
				if (this.scrollPercentage >= step * this.stepPercentage && this.scrollPercentage < (step + 1) * this.stepPercentage) {
					return step;
				}
			}
		}
	},
	watch: {
		'$store.getters.scrollPosition.y': function() {
			this.updateCanvasPosition();
		},
		'currentStep': function(step) {
			this.startAnimation(step);
		}
	},
	mounted() {
		this.stepsElm = [
			this.$refs.step1,
			this.$refs.step2,
			this.$refs.step3,
			this.$refs.step4,
			this.$refs.step5
		];
		this.init3dScene();
		this.updateCanvasPosition();
	},
	methods: {
		startAnimation(i) {
			const duration = 2;
			const tl = new TimelineMax({ paused: true });
			const toPercentage = this.stepPercentage * i / 100;
			tl
			.to(this, duration, {
				animationPercentage: toPercentage,
				ease: Power1.easeOut
			})
			.to(this.stepsElm, duration / 2, {
				opacity: 0,
				pointerEvents: 'none'
			}, 0);
			switch (i) {
				case 0:
					tl
					.to(this.stepsElm[0], duration / 2, {
						opacity: 1,
						pointerEvents: 'all'
					}, duration / 2);
					break;
				case 1:
					tl
					.to(this.stepsElm[1], duration / 2, {
						opacity: 1,
						pointerEvents: 'all'
					}, duration / 2);
					break;
				case 2:
					tl
					.to(this.stepsElm[2], duration / 2, {
						opacity: 1,
						pointerEvents: 'all'
					}, duration / 2);
					break;
				case 3:
					tl
					.to(this.stepsElm[3], duration / 2, {
						opacity: 1,
						pointerEvents: 'all'
					}, duration / 2);
					break;
				case 4:
					tl
					.to(this.stepsElm[4], duration / 2, {
						opacity: 1,
						pointerEvents: 'all'
					}, duration / 2);
					break;
			}
			tl.play();
		},
		updateCanvasPosition() {
			const rect = this.$el.getBoundingClientRect();
			if (rect.bottom <= this.vh) {
				this.canvasPosition = 'below';
				this.scrollPercentage = 100;
			} else if (rect.top <= 0) {
				this.canvasPosition = 'fixed';
				const position = Math.abs(rect.top);
				const total = rect.height - (this.vh * 2);
				this.scrollPercentage = parseFloat((position * 100 / total).toFixed(2));
			} else {
				this.scrollPercentage = 0;
				this.canvasPosition = '';
			}
		},
		init3dScene() {
			const loader = new THREE.OBJLoader();
			this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
			this.camera.position.set(this.study.CameraSpline[0][0], this.study.CameraSpline[0][1], this.study.CameraSpline[0][2]);
			this.camera.lookAt(this.study.TargetSpline[0][0], this.study.TargetSpline[0][1], this.study.TargetSpline[0][2]);
			this.scene = new THREE.Scene();
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			const textureLoader = new THREE.TextureLoader();
			this.texture = textureLoader.load(this.study.Texture);
			loader.load(
				this.study.Obj,
				object => {
					this.court = object;
					this.court.children[0].material = new THREE.MeshBasicMaterial();
					this.court.children[0].material.map = this.texture;
					this.court.position.set(0, 0, 0);
					this.scene.add(this.court);
				}
			);
			this.scene.background = new THREE.Color(0x6F88EE);
			this.$refs.canvasWrapper.appendChild(this.renderer.domElement);

			this.cameraSplineCurve = this.createSpline(this.study.CameraSpline);
			this.targetSplineCurve = this.createSpline(this.study.TargetSpline, 0x00FF00);
			this.animate();
		},
		createSpline(points) {
			const splinePoints = [];
			points.forEach(position => {
				splinePoints.push(new THREE.Vector3(position[0], position[1], position[2]));
			});
			const splineCurve = new THREE.CatmullRomCurve3(splinePoints);
			return splineCurve;
		},
		animate() {
			requestAnimationFrame(this.animate);
			if (this.$el.getBoundingClientRect().top < this.vh) {
				this.render();
			}
		},
		render() {
			const percentage = this.animationPercentage.toFixed(5);
			const cameraPosition = this.cameraSplineCurve.getPoint(percentage);
			this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
			const targetPosition = this.targetSplineCurve.getPoint(percentage);
			this.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);

			this.renderer.render(this.scene, this.camera);
		}
	}
};
</script>
<style lang="scss">
.study {
	position: relative;
	.step {
		height: 100vh;
		&:last-of-type {
			height: 200vh;
		}
		.stepWrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			pointer-events: none;
			z-index: 1;
		}
	}
	.canvasWrapper, .stepWrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}
	&.fixed {
		.canvasWrapper, .stepWrapper {
			position: fixed;
		}
	}
	&.below {
		.canvasWrapper, .stepWrapper {
			top: auto;
			bottom: 0;
		}
	}
}
</style>
