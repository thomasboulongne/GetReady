<template>
	<div :class="['intro', 'step__' + step]" @click.shift="goToNextStep">
		<div :class="['step', 'step1']" ref="step1">
			<div class="sentences">
				<div class="sentence" v-for="i in 3" :key="i" ref="sentences">
					<span v-for="(word, j) in $t('intro.step1.sentences.' + i).split(' ')" :key="j">{{ word }} </span>
				</div>
			</div>
			<div :class="['button__next']" @click="goToStep(2)">
				<button-comp :text="$t('next')" ref="step1__button"></button-comp>
			</div>
		</div>
		<div :class="['step', 'step2']" ref="step2" :style="{'--cardsLeftMargin': cardsLeftMargin}">
			<div class="cards" ref="cardsWrapper">
				<h3 class="heading">
					<span v-for="(word, i) in $t('intro.step2.sidePanel.heading').split(' ')" :key="i">{{ word }} </span>
				</h3>
				<ul v-hammer:pan.horizontal="panGesture" ref="cardsList">
					<li :class="['card', (cards.length - 1 - i) === currentCardIndex ? 'selected': '']" v-for="(card, i) in cards.slice().reverse()" ref="cards" :key="card.title + (cards.length - 1 - i)">
						<div class="illustration">
							<img :src="card.img" alt="" class="shadow">
							<img :src="card.img" alt="">
						</div>
						<h3>{{ card.title }}</h3>
						<p v-html="card.text"></p>
					</li>
				</ul>
				<div class="nav">
					<div class="arrow left" @click="prevCard" ref="cardsArrowLeft">
						<img src="~/assets/images/arrow.svg"/>
					</div>
					<div class="dots">
						<span :class="['dot', i === currentCardIndex ? 'selected' : '']" v-for="(card, i) in cards" :key="i" @click="goToCard(i)"></span>
					</div>
					<div class="arrow right" @click="nextCard" ref="cardsArrowRight">
						<img src="~/assets/images/arrow.svg"/>
						<div :class="['button__next']" @click="goToStep(3)">
							<button-comp :text="$t('next')" ref="step2__button"></button-comp>
						</div>
					</div>
				</div>
			</div>
			<div class="formPanel" ref="formPanel">
				<div class="wrapper">
					<span class="subheading" v-t="'intro.step2.formPanel.subheading'" ref="formSubheading"></span>
					<h2 v-t="'intro.step2.formPanel.heading'" ref="formHeading"></h2>
					<p v-t="'intro.step2.formPanel.text'" ref="formText"></p>
					<form>
						<input type="text" :placeholder="$t('intro.step2.formPanel.placeholder')" ref="goalInput">
						<div class="examples" ref="formExamples">
							<span v-t="'intro.step2.formPanel.Example'"></span>
							<div class="wrapper">
								<ul>
									<li v-for="(example, i) in examples" v-html="example" :key="i"></li>
								</ul>
							</div>
						</div>
						<div class="buttons" @click="validate">
							<button-comp :text="$t('intro.step2.formPanel.submit')" ref="formButton"></button-comp>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import buttonComp from '~/components/Button';
export default {
	data() {
		return {
			step: 1,
			cardsTranslationDuration: '1000',
			currentCardIndex: 0,
			cardDirection: -1,
			allCardsAreDisplayed: false,
			cardsLeftMargin: '20%',
			cards: [
				{
					title: this.$t('cards.1.title'),
					text: this.$t('cards.1.text'),
					img: require('~/assets/images/cards/p.png'),
					displayed: true
				},
				{
					title: this.$t('cards.2.title'),
					text: this.$t('cards.2.text'),
					img: require('~/assets/images/cards/s.png'),
					displayed: false
				},
				{
					title: this.$t('cards.3.title'),
					text: this.$t('cards.3.text'),
					img: require('~/assets/images/cards/m.png'),
					displayed: false
				},
				{
					title: this.$t('cards.4.title'),
					text: this.$t('cards.4.text'),
					img: require('~/assets/images/cards/a.png'),
					displayed: false
				},
				{
					title: this.$t('cards.5.title'),
					text: this.$t('cards.5.text'),
					img: require('~/assets/images/cards/r.png'),
					displayed: false
				},
				{
					title: this.$t('cards.6.title'),
					text: this.$t('cards.6.text'),
					img: require('~/assets/images/cards/t.png'),
					displayed: false
				}
			],
			examples: [
				this.$t('intro.step2.formPanel.examples.1'),
				this.$t('intro.step2.formPanel.examples.2')
			]
		};
	},
	watch: {
		'step': function(step) {
			switch (step) {
				case 2:
					this.animateStep2();
					break;
				case 3:
					this.animateStep3();
			}
		},
		'currentCardIndex': function(currentCardIndex, prevCardIndex) {
			const tl = new TimelineMax({
				paused: true,
				onComplete: () => {
					this.cards[currentCardIndex].displayed = true;
					let allDisplayed = true;
					this.cards.forEach(card => {
						allDisplayed = card.displayed;
					});
					this.allCardsAreDisplayed = allDisplayed;
				}
			});
			let i = prevCardIndex;
			let k = 0;
			while (i !== currentCardIndex) {
				const card = this.$refs.cards[this.cards.length - 1 - i];
				tl
				.to(card, 0.5, {
					xPercent: this.cardDirection === 1 ? 90 : -180,
					x: 0,
					'--cardBoxShadowOpacity': 0.09,
					ease: Power4.easeOut
				}, k === 0 ? '+=0' : '-=0.5');
				i = i + 1 > this.cards.length - 1 ? 0 : i + 1;
				this.$refs.cards.forEach((card, j) => {
					tl.set(card, {
						zIndex: this.getCardZIndex(this.cards.length - 1 - j, i)
					});
				});
				tl.to(card, 0.4, {
					xPercent: -50,
					x: 0,
					'--cardBoxShadowOpacity': 0,
					ease: Power4.easeInOut
				});
				k++;
			}
			tl.play();
		},
		'allCardsAreDisplayed': function(allDisplayed) {
			if (allDisplayed) {
				TweenMax.to(this.$refs.step2.querySelector('.button__next'), 0.8, {
					opacity: 1,
					pointerEvents: 'all'
				});
			}
		}
	},
	mounted() {
		this.animateStep1();
	},
	methods: {
		goToStep(index) {
			this.step = index;
		},

		animateStep1() {
			const tl = new TimelineMax({ paused: true });
			const duration = 1;
			tl.staggerTo([this.$refs.sentences[0], this.$refs.sentences[1]], duration, {
				opacity: 1,
				yPercent: 0,
				rotation: '0deg',
				ease: Power4.easeOut
			}, 0.2)
			.to(this.$refs.sentences[2], duration, {
				opacity: 1,
				yPercent: 0,
				rotation: '0deg',
				ease: Power4.easeOut
			}, '+=0.3')
			.add(() => {
				this.$refs.step1__button.show = true;
			});

			tl.play();
		},

		animateStep2() {
			return new Promise(resolve => {
				const tl = new TimelineMax({ paused: true, onComplete: resolve, delay: 0.5 });
				tl
				.to(this.$refs.step1, 0.4, {
					opacity: 0,
					scale: 0.97,
					pointerEvents: 'none'
				})
				.set(this.$refs.step2, {
					opacity: 1,
					scale: 1,
					pointerEvents: 'all'
				})
				.staggerFrom(this.$refs.step2.querySelectorAll('.heading span'), 1.2, {
					yPercent: 10,
					rotation: '4deg',
					opacity: 0,
					ease: Power4.easeOut
				}, 0.1)
				.staggerFrom(this.$refs.cards, 0.6, {
					x: this.$store.getters.viewportSize.width / 1.5,
					y: '6vh',
					rotation: '15deg',
					ease: Power4.easeOut
				}, 0.1, '-=0.3')
				.to(this.$refs.cardsList, 0.3, {
					'--boxShadowOpacity': 0.09
				})
				.staggerFrom(this.$refs.step2.querySelectorAll('.dot'), 1, {
					yPercent: 10,
					opacity: 0,
					ease: Power4.easeOut
				}, 0.1)
				.from(this.$refs.step2.querySelectorAll('.arrow'), 1, {
					yPercent: 10,
					opacity: 0,
					ease: Power4.easeOut
				})
				;
				tl.play();
			});
		},

		animateStep3() {
			return new Promise(resolve => {
				const tl = new TimelineMax({ paused: true, onComplete: resolve });
				const formElements = [
					this.$refs.formSubheading,
					this.$refs.formHeading,
					this.$refs.formText,
					this.$refs.goalInput,
					this.$refs.formExamples
				];

				tl
				.to(this.$refs.step2.querySelector('.button__next'), 0.3, {
					opacity: 0,
					pointerEvents: 'none'
				})
				.set(this.$refs.formPanel, {
					opacity: 1,
					pointerEvents: 'all'
				})
				.set(formElements, {
					transformOrigin: 'center right'
				})
				.to(this.$refs.cardsWrapper, 1, {
					left: this.cardsLeftMargin,
					xPercent: 0,
					x: 0,
					ease: Power4.easeInOut
				}, '-=0.3')
				.staggerFrom(formElements, 1, {
					opacity: 0,
					rotation: '-1.5deg',
					ease: Power4.easeOut
				}, 0.2, '-=0.5')
				.add(() => {
					this.$refs.formButton.show = true;
				})
				;

				tl.play();
			});
		},

		goToNextStep() {
			const nextStep = this.step + 1 > 2 ? 0 : this.step + 1;
			this.goToStep(nextStep);
		},

		goToCard(i) {
			this.currentCardIndex = i;
		},

		getCardZIndex(i, currentCardIndex) {
			const value = (this.cards.length - i) + (currentCardIndex) - 1;
			const zIndex = value % this.cards.length;
			return zIndex;
		},

		panGesture(e) {
			if (e.isFinal) {
				this.nextCard();
			} else {
				switch (e.offsetDirection) {
					case 2:
						this.cardDirection = -1;
						this.cardSlideLeft();
						break;
					case 4:
						this.cardDirection = 1;
						this.cardSlideRight();
						break;
				}
			}
		},

		nextCard() {
			this.goToCard(this.currentCardIndex + 1 < this.cards.length ? this.currentCardIndex + 1 : 0);
		},

		prevCard() {
			this.goToCard(this.currentCardIndex - 1 > -1 ? this.currentCardIndex - 1 : this.cards.length - 1);
		},

		cardSlideLeft() {
			const card = this.$refs.cards[this.cards.length - 1 - this.currentCardIndex];
			TweenMax
			.to(card, 0.5, {
				xPercent: -180,
				x: 0,
				'--cardBoxShadowOpacity': 0.09,
				ease: Power4.easeOut
			});
		},

		cardSlideRight() {
			const card = this.$refs.cards[this.cards.length - 1 - this.currentCardIndex];
			TweenMax
			.to(card, 0.5, {
				xPercent: 130,
				x: 0,
				'--cardBoxShadowOpacity': 0.09,
				ease: Power4.easeOut
			});
		},

		validate(event) {
			event.preventDefault();
			this.$store.dispatch('setGoal', this.$refs.goalInput.value);
			this.$router.push({name: 'index'});
		}
	},
	components: {
		buttonComp
	}
};
</script>


<style lang="scss">
.intro {
	height: 100vh;
	width: 100vw;
	background: var(--lightBlue);
	--stepTransitionDuration: 0.7s;
	color: white;
	position: relative;
	.button__next {
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
		.buttonWrapper {
			--buttonColor: var(--lightBlue);
		}
	}
	.step {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transform: scale(0.97);
		opacity: 0;
		pointer-events: none;
	}
	.step1 {
		opacity: 1;
		transform: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		pointer-events: all;
		.sentences {
			text-align: center;
			font-size: 1.6rem;
			line-height: 2;
			.sentence {
				transform-origin: center right;
				opacity: 0;
				transform: translateY(10%) rotate(-4deg);
				span {
					display: inline-block;
				}
				&:last-child {
					font-weight: bold;
				}
			}
		}
	}

	.step2 {
		position: relative;
		--cardWidth: 20rem;
		.cards {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			align-items: center;
			z-index: 1;
			.heading {
				font-size: 1.6rem;
				margin-bottom: 2em;
				span {
					display: inline-block;
					transform-origin: center left;
				}
			}
			ul {
				display: block;
				z-index: 2;
				width: var(--cardWidth);
				height: calc(var(--cardWidth) * 1.54);
				position: relative;
				--boxShadowOpacity: 0;
				box-shadow: 0 calc(var(--cardWidth) * 0.03) calc(var(--cardWidth) * 0.07) rgba(0, 0, 0, var(--boxShadowOpacity));
				border-radius: calc(var(--cardWidth) / 15);
				.card {
					width: var(--cardWidth);
					height: calc(var(--cardWidth) * 1.54);
					background: white;
					color: var(--black);
					position: absolute;
					left: 50%;
					top: 50%;
					border-radius: calc(var(--cardWidth) / 15);
					--cardRotate: 0deg;
					transform: translate(-50%, -50%) rotate(var(--cardRotate));
					border: solid 1px rgba(0, 0, 0, 0.07);
					padding: calc(var(--cardWidth) * 0.1);
					box-sizing: border-box;
					text-align: center;
					opacity: 1;
					--cardBoxShadowOpacity: 0;
					box-shadow: 0 calc(var(--cardWidth) * 0.03) calc(var(--cardWidth) * 0.07) rgba(0, 0, 0, var(--cardBoxShadowOpacity));
					.illustration {
						position: relative;
						width: 66%;
						margin: auto;
						img {
							width: 100%;
							position: relative;
							&.shadow {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-55%, -35%);
								filter: brightness(0);
								opacity: 0.05;
							}
						}
					}
					h3 {
						margin-top: 2rem;
						margin-bottom: 1rem;
						font-size: 2rem;
						color: var(--blue);
						text-transform: uppercase;
					}
					p {
						margin: 0;
						font-weight: 300;
					}
					@for $i from 1 to 10 {
						&:nth-child(#{$i}) {
							--cardRotate: calc(#{random($limit: 8) - 4} * 1deg);
						}
					}
				}
			}
			.nav {
				display: flex;
				width: var(--cardWidth);
				justify-content: center;
				align-items: center;
				margin-top: 3rem;
				.arrow {
					cursor: pointer;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 150%;
					&.right {
						right: auto;
						left: 150%;
						img {
							transform: scale(-1);
						}
					}
					.buttonComp {
						pointer-events: none;
					}
				}
				.dots {
					.dot {
						position: relative;
						width: 6px;
						height: 6px;
						display: inline-block;
						margin: 0 0.5em;
						cursor: pointer;
						transform: translateY(-50%);
						&:after {
							content: '';
							border: solid white 2px;
							border-radius: 50%;
							position: absolute;
							display: block;
							width: 0;
							height: 0;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							transition: all 0.2s;
						}
						&.selected {
							cursor: default;
							&:after {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
		.formPanel {
			position: absolute;
			top: 0;
			left: 50%;
			bottom: 0;
			width: 50%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			pointer-events: none;
			opacity: 0;
			.wrapper {
				width: calc(100% - var(--cardsLeftMargin));
				text-align: left;
				.subheading {
					display: block;
					font-size: 1.3rem;
					text-transform: uppercase;
				}
				h2 {
					margin-top: 0;
					margin-bottom: 0;
				}
				p {
					display: inline-block;
					width: 66%;
					margin-bottom: 4rem;
					font-size: 1.1rem;
				}
				form {
					position: relative;
					input[type=text] {
						font-size: 2.5rem;
						width: 100%;
						font-family: inherit;
						color: inherit;
						background: none;
						border: none;
						border-bottom: solid white 2px;
						padding: 0.1em;
						line-height: 1.5;
						&::placeholder {
							color: #959FB0;
							font-weight: 100;
						}
					}
					.examples {
						display: inline-block;
						margin: 2rem 0;
						font-weight: bold;
						width: 100%;
						span {
							line-height: 2.35em;
						}
						.wrapper {
							margin-left: 1rem;
							vertical-align: top;
							display: inline-block;
							height: 2.35em;
							overflow: hidden;
							@keyframes slide {
								0%, 45% {
									transform: translateY(0%);
								}
								55%, 90% {
									transform: translateY(-50%);
								}
							}
							ul {
								animation: slide 10s infinite;
								li {
									font-size: 1.35em;
									font-style: italic;
									white-space: nowrap;
								}
							}
						}
					}

					.buttons {
						.buttonWrapper {
							--buttonColor: var(--lightBlue);
						}
					}
				}
			}
		}
	}
}
</style>
