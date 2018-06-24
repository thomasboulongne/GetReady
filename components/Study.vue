<template>
	<div :class="['study', canvasPosition]">
		<div :class="['canvasWrapper']" ref="canvasWrapper"></div>
		<div class="step">
			<div class="stepWrapper" ref="step1">
				<h2 class="sectionTitle" v-t="'Study'" ref="step1_sectionTitle"></h2>
				<h3 class="title" v-html="study.Title" ref="step1_title"></h3>
				<span class="subTitle" v-html="study.Title" ref="step1_subtitle"></span>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step2">
				<p v-html="study.step2.Text" ref="step2_text"></p>
				<div class="values">
					<div class="value" v-for="(value, i) in study.step2.Values" ref="step2_value" :key="i">
						<span v-html="value.split('_')[0]"></span>
						<span class="label" v-html="value.split('_')[1]"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step3">
				<div class="groups">
					<div class="group" v-for="(group, i) in study.step3.Groups" :key="i">
						<span class="groupName" v-html="group.Name"></span>
						<div class="groupActivity">
							<span v-html="group.Value"></span>
						</div>
						<p class="groupDescription" v-html="group.Description"></p>
					</div>
				</div>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step4">
				<p v-html="study.step4.Text" ref="step4_text"></p>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper step5" ref="step5">
				<div class="groups">
					<div class="group" v-for="(group, i) in study.step5.Groups" :key="i" ref="step5groups">
						<span class="groupName" v-html="group.Name"></span>
						<div class="groupValue">
							<span v-html="group.Value.split('_')[0]"></span>
							<span v-html="group.Value.split('_')[1]"></span>
							<span v-html="group.Value.split('_')[2]"></span>
						</div>
						<p class="groupDescription" v-html="group.Description"></p>
					</div>
					<div class="group question" ref="step5question">
						<span class="groupName" v-html="study.step5.Groups[2].Name"></span>
						<p class="groupQuestion" v-html="study.step5.Groups[2].Question"></p>
						<div class="groupOptions">
							<span v-for="(option, i) in study.step5.Groups[2].Options" :key="i" v-html="option" @click="revealStep5Answer"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="step">
			<div class="stepWrapper" ref="step6">
				<p v-html="study.step6.Text" ref="step6_text"></p>
				<div class="more">
					<div class="title" v-html="study.step6.More.Title"></div>
					<div class="authors" v-html="study.step6.More.Authors"></div>
					<a :href="study.step6.More.Link" target="_blank" rel="noopener" class="Link">
						<button-comp ref="step6_moreButton" :text="$t('Read')" :color="$store.getters.currentColor"></button-comp>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import ButtonComp from '~/components/Button';
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
			stepsElm: [],
			duration: 1
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
				if (this.scrollPercentage >= step * this.stepPercentage && this.scrollPercentage < (step + 1) * this.stepPercentage && this.scrollPercentage > 0) {
					return step;
				}
			}
			return -1;
		}
	},
	watch: {
		'$store.getters.scrollPosition.y': function() {
			this.updateCanvasPosition();
		},
		'$store.getters.viewportSize': function() {
			this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
			this.renderer.setSize(window.innerWidth, window.innerHeight);
		},
		'currentStep': function(step, previousStep) {
			this.startAnimation(step, previousStep);
		}
	},
	mounted() {
		this.stepsElm = [
			this.$refs.step1,
			this.$refs.step2,
			this.$refs.step3,
			this.$refs.step4,
			this.$refs.step5,
			this.$refs.step6
		];
		this.init3dScene();
		this.updateCanvasPosition();

		[this.$refs.step2_text, this.$refs.step4_text, this.$refs.step6_text].forEach(text => {
			lining(text, {
				'autoResize': true
			});
		});
	},
	methods: {
		startAnimation(i, j) {
			const tl = new TimelineMax({ paused: true });
			const toPercentage = (this.stepPercentage * i / 100) >= 0 ? this.stepPercentage * i / 100 : 0;
			tl
			.to(this, this.duration, {
				animationPercentage: toPercentage,
				ease: Power1.easeOut,
				overwrite: 'all'
			});
			switch (j) {
				// case 0:
				// 	tl
				// 	.staggerTo([this.$refs.step1_subtitle, this.$refs.step1_title, this.$refs.step1_sectionTitle], this.duration * 0.6, {
				// 		opacity: 0,
				// 		y: 20,
				// 		rotation: -6,
				// 		ease: Power4.easeOut
				// 	}, this.duration / 8, 0)
				// 	.set(this.stepsElm[0], {
				// 		pointerEvents: 'none',
				// 		opacity: 0
				// 	})
				// 	;
				// 	break;
				case -1:
					break;
				default:
					tl
					.to(this.stepsElm, this.duration / 2, {
						opacity: 0,
						pointerEvents: 'none',
						overwrite: 'all'
					}, 0);
					break;
			}

			tl.add('startStepContentAnimation', j >= 0 ? this.duration / 2 : 0);

			switch (i) {
				case 0:
					tl
					.set(this.stepsElm[0], {
						opacity: 1,
						pointerEvents: 'all',
						overwrite: 'all'
					}, 'startStepContentAnimation')
					.staggerFromTo([this.$refs.step1_sectionTitle, this.$refs.step1_title, this.$refs.step1_subtitle], this.duration * 1.5, {
						opacity: 0,
						y: 20,
						rotation: -6
					}, {
						opacity: 1,
						y: 0,
						rotation: 0,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, this.duration / 3, 'startStepContentAnimation')
					;
					break;
				case 1:
					tl
					.set(this.stepsElm[1], {
						opacity: 1,
						pointerEvents: 'all',
						overwrite: 'all'
					}, 'startStepContentAnimation')
					.staggerFromTo(this.$refs.step2_text.querySelectorAll('text-line'), this.duration, {
						opacity: 0,
						y: 20,
						rotation: -6
					}, {
						opacity: 1,
						y: 0,
						rotation: 0,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, 0.05, 'startStepContentAnimation')
					.staggerFromTo(this.stepsElm[1].querySelectorAll('span'), this.duration, {
						opacity: 0,
						y: 20,
						rotation: -6
					}, {
						opacity: 1,
						y: 0,
						rotation: 0,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, 0.1, '-=' + this.duration * 0.6)
					.staggerFromTo(this.$refs.step2_value, this.duration, {
						'--valueLineScale': 0
					}, {
						'--valueLineScale': 1,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, 0.1, '-=' + this.duration / 2)
					;
					break;
				case 2:
					tl
					.set(this.stepsElm[2], {
						opacity: 1,
						pointerEvents: 'all',
						overwrite: 'all'
					}, 'startStepContentAnimation')
					;
					Array.from(this.stepsElm[2].querySelectorAll('.group')).forEach(group => {
						tl
						.staggerFromTo(group.querySelectorAll('span, p'), this.duration, {
							opacity: 0,
							y: 20,
							rotation: -6
						}, {
							opacity: 1,
							y: 0,
							rotation: 0,
							ease: Power4.easeOut,
							overwrite: 'all'
						}, 0.1, '-=0.3');
					});
					break;
				case 3:
					tl
					.set(this.stepsElm[3], {
						opacity: 1,
						pointerEvents: 'all',
						overwrite: 'all'
					}, 'startStepContentAnimation')
					.staggerFromTo(this.$refs.step4_text.querySelectorAll('text-line'), this.duration, {
						opacity: 0,
						y: 20,
						rotation: -6
					}, {
						opacity: 1,
						y: 0,
						rotation: 0,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, 0.05, 'startStepContentAnimation');
					break;
				case 4:
					tl
					.to(this.stepsElm[4], this.duration / 2, {
						opacity: 1,
						pointerEvents: 'all',
						overwrite: 'all'
					}, 'startStepContentAnimation');
					Array.from(this.stepsElm[4].querySelectorAll('.group')).forEach(group => {
						tl
						.staggerFromTo(group.querySelectorAll('span, p'), this.duration, {
							opacity: 0,
							y: 20,
							rotation: -6
						}, {
							opacity: 1,
							y: 0,
							rotation: 0,
							ease: Power4.easeOut,
							overwrite: 'all'
						}, 0.1, '-=0.3');
					});
					break;
				case 5:
					tl
					.to(this.stepsElm[5], this.duration / 2, {
						opacity: 1,
						pointerEvents: 'all',
						overwrite: 'all'
					}, 'startStepContentAnimation')
					.staggerFromTo(this.$refs.step6_text.querySelectorAll('text-line'), this.duration, {
						opacity: 0,
						y: 20,
						rotation: -6
					}, {
						opacity: 1,
						y: 0,
						rotation: 0,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, 0.05, 'startStepContentAnimation')
					.staggerFromTo(this.stepsElm[5].querySelectorAll('.more .title, .more .authors'), this.duration, {
						opacity: 0,
						y: 20,
						rotation: -6
					}, {
						opacity: 1,
						y: 0,
						rotation: 0,
						ease: Power4.easeOut,
						overwrite: 'all'
					}, 0.05, 'startStepContentAnimation')
					.add(() => {
						this.$refs.step6_moreButton.show = true;
					})
					;
					break;
				default:
					tl
					.to(this.stepsElm, this.duration / 2, {
						opacity: 0,
						pointerEvents: 'none',
						overwrite: 'all'
					}, 0);
					break;
			}
			tl.play();
		},
		revealStep5Answer() {
			const tl = new TimelineMax({ paused: true });
			tl.staggerFromTo([this.$refs.step5question.querySelector('.groupOptions'), this.$refs.step5question.querySelector('.groupQuestion'), this.$refs.step5question.querySelector('.groupName')], this.duration * 0.7, {
				opacity: 1,
				y: 0,
				rotation: 0
			}, {
				opacity: 0,
				y: 20,
				rotation: -6,
				ease: Power4.easeOut,
				overwrite: 'all'
			}, 0.06)
			.set(this.$refs.step5question, {
				display: 'none'
			})
			.set(this.$refs.step5groups[2], {
				display: 'block'
			})
			.staggerFromTo(this.$refs.step5groups[2].querySelectorAll('span, p'), this.duration, {
				opacity: 0,
				y: 20,
				rotation: -6
			}, {
				opacity: 1,
				y: 0,
				rotation: 0,
				ease: Power4.easeOut,
				overwrite: 'all'
			}, 0.1)
			;
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
			this.texture = textureLoader.load(process.env.PATH + this.study.Texture);
			loader.load(
				process.env.PATH + this.study.Obj,
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
			const rect = this.$el.getBoundingClientRect();
			if (rect.top < this.vh && rect.bottom > 0) {
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
	},
	components: {
		ButtonComp
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
			flex-direction: column;
			color: white;
			opacity: 0;
			pointer-events: none;
			z-index: 1;
			text-align: center;
			.sectionTitle {
				color: white;
				margin: 0;
				text-transform: uppercase;
				font-family: 'Antonio';
				font-weight: 600;
				font-size: 1.11rem;
				transform-origin: right;
			}
			.title {
				color: white;
				margin: 2rem 0;
				font-family: 'Antonio';
				text-transform: none;
				font-weight: 400;
				font-size: 3.44rem;
				max-width: 50vw;
				transform-origin: right;
			}
			.subTitle {
				display: inline-block;
				max-width: 20em;
				transform-origin: right;
			}
			p {
				max-width: 45rem;
				font-size: 1.11rem;
				line-height: 2.2;
			}
			.values {
				display: flex;
				width: 100%;
				max-width: 45rem;
				margin-top: 2rem;
				.value {
					flex-grow: 0;
					flex-shrink: 0;
					width: calc(100% / 3);
					text-align: center;
					position: relative;
					--valueLineScale: 0;
					span {
						font-family: 'Antonio';
						font-weight: 600;
						display: block;
						text-align: center;
						font-size: 3.6rem;
						&.label {
							font-size: 1.11rem;
						}
					}
					&:not(:last-child) {
						&:after {
							content: '';
							height: 50%;
							width: 1px;
							right: 0;
							position: absolute;
							top: 50%;
							display: block;
							background-color: white;
							opacity: 0.45;
							transform: translateY(-50%) scaleY(var(--valueLineScale));
						}
					}
				}
			}
			.groups {
				display: flex;
				flex-direction: row;
				text-align: left;
				align-items: flex-start;
				justify-content: center;
				.group {
					width: 20rem;
					flex-grow: 0;
					font-style: 0;
					box-sizing: border-box;
					.groupName {
						color: #072068;
						font-family: 'Antonio';
						font-size: 1.11rem;
						font-weight: 600;
						text-transform: uppercase;
						display: inline-block;
					}
					.groupActivity {
						margin: 2rem 0;
						span {
							display: inline-block;
							font-family: 'Antonio';
							font-weight: 400;
							font-size: 2.6rem;
						}
					}
					.groupValue {
						margin: 1.5rem 0;
						max-width: 10rem;
						span {
							font-family: 'Antonio';
							display: inline-block;
							font-weight: 400;
							font-size: 1.55rem;
							&:nth-child(1) {
								font-weight: 600;
								font-size: 6rem;
							}
						}
					}
					.groupQuestion {
						font-family: 'Antonio';
						display: block;
						font-weight: 400;
						font-size: 1.66rem;
						margin: 3rem 0 1.5rem;
						line-height: 1.5;
						max-width: 18rem;
					}
					.groupOptions {
						display: flex;
						justify-content: space-between;
						span {
							display: block;
							font-family: 'Antonio';
							display: inline-block;
							font-weight: 400;
							font-size: 1.55rem;
							cursor: pointer;
							&:before {
								content: '';
								height: 1.8rem;
								width: 1.8rem;
								border-radius: 100%;
								border: #072068 solid 1px;
								display: block;
								margin-bottom: 0.6rem;
								transition: box-shadow 0.2s var(--ease);
								box-shadow: inset #072068 0 0 0 0px;
							}
							&:after {
								content: '%';
								font-size: 0.83rem;
							}
							&:hover {
								&:before {
									box-shadow: inset #072068 0 0 0 0.9rem;
								}
							}
						}
					}
					&:nth-child(2) {
						margin: 0 4rem;
					}
				}

			}
			.more {
				position: absolute;
				right: var(--spacing);
				bottom: var(--spacing);
				text-align: left;
				max-width: 21rem;
				.title {
					font-family: 'Antonio';
					font-size: 1.66rem;
					margin: 0;
				}
				.authors {
					margin: 2rem 0;
				}
				a {
					font-style: normal;
				}
			}
			&.step5 {
				.group:nth-child(3) {
					display: none;
				}
			}
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
