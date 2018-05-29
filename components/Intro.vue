<template>
	<div :class="['intro', 'step__' + step]" @click.shift="toggleCards">
		<div class="step step1">
			<div class="sentences">
				<div class="sentence" v-for="i in 3" :key="i" ref="sentences">
					<span v-for="(word, j) in $t('intro.step1.sentences.' + i).split(' ')" :key="j">{{ word }} </span>
				</div>
			</div>
			<div :class="['button__next', showNextButton ? 'show' : '']" @click="goToStep(2)">
				<span>{{ $t('next') }}</span>
				<img src="~/assets/images/arrow@3x.png"/>
			</div>
		</div>
		<div :class="['step', 'step2', cardsStatus]" :style="{'--cardsTranslationDuration': cardsTranslationDuration + 'ms', '--singleCardTranslationDuration': cardsTranslationDuration / cards.length + 'ms'}">
			<h3 class="heading" v-t="'intro.step2.sidePanel.heading'"></h3>
			<div :class="['cards',]">
				<div :class="['card', (cards.length - 1 - i) === currentCardIndex ? 'selected': '']" v-for="(card, i) in cards.slice().reverse()" ref="cards" :style="{zIndex: getCardZIndex(cards.length - 1 - i)}" :key="card.title + (cards.length - 1 - i)">
					<div class="illustration">
						<img :src="card.img" alt="" class="shadow">
						<img :src="card.img" alt="">
					</div>
					<h3>{{ card.title }}</h3>
					<p v-html="card.text"></p>
				</div>
			</div>
			<div class="sidePanel">
				<ul>
					<li v-for="(card, i) in cards" :key="i">
						<span :class="[currentCardIndex === i ? 'selected' : '']" @click="goToCard(i)">{{ card.title }}</span>
					</li>
				</ul>
			</div>
			<div class="formPanel">
				<div class="wrapper">
					<h2 v-t="'intro.step2.formPanel.heading'"></h2>
					<p v-t="'intro.step2.formPanel.text'"></p>
					<form>
						<input type="text" :placeholder="$t('intro.step2.formPanel.placeholder')">
						<div class="examples">
							<span v-t="'intro.step2.formPanel.Example'"></span>
							<div class="wrapper">
								<ul>
									<li v-for="(example, i) in examples" v-html="example" :key="i"></li>
								</ul>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			showNextButton: false,
			step: 1,
			cardsStatus: 'beforeEnter',
			cardsTranslationDuration: '1000',
			currentCardIndex: 0,
			cards: [
				{
					title: this.$t('cards.1.title'),
					text: this.$t('cards.1.text'),
					img: '/images/cards/mesurable.png'
				},
				{
					title: this.$t('cards.2.title'),
					text: this.$t('cards.2.text'),
					img: '/images/cards/specific.png'
				},
				{
					title: this.$t('cards.3.title'),
					text: this.$t('cards.3.text'),
					img: '/images/cards/mesurable.png'
				},
				{
					title: this.$t('cards.4.title'),
					text: this.$t('cards.4.text'),
					img: '/images/cards/specific.png'
				},
				{
					title: this.$t('cards.5.title'),
					text: this.$t('cards.5.text'),
					img: '/images/cards/mesurable.png'
				},
				{
					title: this.$t('cards.6.title'),
					text: this.$t('cards.6.text'),
					img: '/images/cards/specific.png'
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
					this.animateStep2()
					.then(() => {
						console.log('yo adele step 2 ok');
					});
					break;
				default:
					break;
			}
		}
	},
	created() {
		// this.currentCardIndex = this.cards.length - 1;
	},
	mounted() {
		const step1animation = new Promise(resolve => {
			this.$refs.sentences.forEach((sentence, i) => {
				setTimeout(() => {
					sentence.classList.add('show');
				}, i * 1500);
				if (i === this.$refs.sentences.length - 1) {
					setTimeout(() => {
						resolve();
					}, (i + 1) * 1500);
				}
			});
		});

		step1animation.then(() => {
			this.showNextButton = true;
		});
	},
	methods: {
		goToStep(index) {
			let promise;
			switch (index) {
				case 2:
					this.step = 2;
					break;
				default:
					break;
			}
			return promise;
		},

		animateStep2() {
			this.cardsStatus = 'beforeEnter';
			return new Promise(resolve => {
				setTimeout(() => {
					this.cardsStatus = 'onEnter';
					setTimeout(() => {
						this.cardsStatus = 'afterEnter';
						setTimeout(() => {
							this.cardsStatus = 'finish';
							setTimeout(() => {
								resolve();
							}, this.cardsTranslationDuration / 2);
						}, this.cardsTranslationDuration / 5);
					}, this.cardsTranslationDuration);
				}, this.cardsTranslationDuration);
			});
		},

		toggleCards() {
			this.goToStep(2);
		},

		goToCard(i) {
			this.currentCardIndex = i;
		},

		getCardZIndex(i) {
			const value = (this.cards.length - i) + (this.currentCardIndex) - 1;
			const zIndex = value % this.cards.length;
			return zIndex;
		}
	}
};
</script>


<style lang="scss">
@keyframes lateSlide {
	from { --cardX: -50%}
	to { --cardX: 0%}
}
.intro {
	height: 100vh;
	width: 100vw;
	background: var(--darkOrange);
	--stepTransitionDuration: 0.7s;
	color: white;
	position: relative;
	.step {
		transition: all var(--stepTransitionDuration) var(--ease);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.step1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.sentences {
			text-align: center;
			font-size: 2rem;
			line-height: 2;
			.sentence {
				span {
					display: inline-block;
					transform: translateY(10%) rotate(4deg);
					transform-origin: center left;
					opacity: 0;
					transition: all 0.3s var(--ease);
				}
				&.show {
					span{
						transform: none;
						opacity: 1;
						@for $j from 1 to 30 {
							&:nth-child(#{$j}) {
								transition-delay: calc((#{$j} - 1) * 0.1s);
							}
						}
					}
				}
			}
		}
		.button__next {
			position: absolute;
			font-size: 1.3rem;
			bottom: 4vh;
			right: 3vw;
			color: white;
			text-transform: uppercase;
			align-items: center;
			pointer-events: none;
			display: flex;
			opacity: 0;
			transition: all 0.8s;
			cursor: pointer;
			span {
				transform: translateY(-0.05em);
			}
			img {
				height: 2.3em;
			}
			&.show {
				pointer-events: all;
				opacity: 1;
			}
		}
	}

	.step2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		position: relative;
		--leftMargin: 3vw;
		--cardsTranslationDelay: var(--cardsTranslationDuration);
		.heading {
			position: absolute;
			top: 10%;
			transform: translateX(0);
			left: var(--leftMargin);
			font-size: 1.6rem;
			transition: all  var(--cardsTranslationDuration) var(--ease) var(--cardsTranslationDelay);
		}
		.cards {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transition: transform var(--cardsTranslationDuration) var(--ease) var(--cardsTranslationDelay);
			transform: translate(calc(50% - (100vw / 5)), -50%);
			z-index: 2;
			.card {
				--cardWidth: 18vw;
				width: var(--cardWidth);
				height: calc(var(--cardWidth) * 1.54);
				background: white;
				color: var(--black);
				position: absolute;
				left: 50%;
				right: 50%;
				border-radius: calc(var(--cardWidth) / 15);
				--cardX: -50%;
				--cardY: -50%;
				--cardRotate: 0deg;
				transform: translate(var(--cardX), var(--cardY)) rotate(var(--cardRotate));
				box-shadow: 0 calc(var(--cardWidth) * 0.03) calc(var(--cardWidth) * 0.07) rgba(0, 0, 0, 0.05);
				border: solid 1px rgba(0, 0, 0, 0.09);
				padding: calc(var(--cardWidth) * 0.1);
				box-sizing: border-box;
				text-align: center;
				opacity: 1;
				@for $j from 1 to 30 {
					&:nth-child(#{$j}) {
						transition: transform calc(var(--cardsTranslationDuration) / 2) var(--ease) calc((#{$j} - 0.5) * 0.1s), opacity 0.2s calc((#{$j} - 0.5) * 0.1s);
					}
				}
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
				}
				@for $i from 1 to 10 {
					&:nth-child(#{$i}) {
						--cardRotate: calc(#{random($limit: 8) - 4} * 1deg);
					}
				}
				&.selected {
					--cardRotate: 0deg;
				}
			}
		}
		.sidePanel {
			text-align: left;
			position: absolute;
			left: var(--leftMargin);
			transform: translate(0);
			text-transform: uppercase;
			ul {
				display: flex;
				flex-direction: column;
				li {
					margin: 1em 0;
					span {
						opacity: 0.6;
						transition: opacity 0.4s;
						cursor: pointer;
						&.selected {
							cursor: default;
							opacity: 1;
						}
					}
				}
			}
		}
		.formPanel {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all var(--cardsTranslationDuration);
			background: var(--lightOrange);
			.wrapper {
				width: 100%;
				max-width: 66%;
				text-align: left;
				opacity: 0;
				transform: scale(0.97);
				p {
					display: inline-block;
					width: 66%;
					margin-bottom: 4rem;
				}
				form {
					position: relative;
					input {
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
							color: rgba(255, 255, 255, 0.7);
							font-style: italic;
							font-weight: 100;
						}
					}

					.examples {
						display: inline-block;
						margin: 2rem 0;
						color: black;
						opacity: 0.35;
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
				}
			}
		}
		&.beforeEnter {
			.cards {
				transform: translate(-50%, -50%);
				.card {
					opacity: 0;
					--cardX: calc(-50% + 50vw);
					--cardY: -20%;
					--cardRotate: 20deg;
				}
			}
			.heading {
				left: 50%;
				transform: translateX(-50%);
			}
			.sidePanel {
				ul {
					li {
						span {
							opacity: 0;
						}
					}
				}
			}
		}
		&.onEnter {
			.sidePanel {
				ul {
					li {
						span {
							opacity: 0;
						}
					}
				}
			}
		}
		&.afterEnter {
			.sidePanel {
				ul {
					li {
						@for $i from 0 to 10 {
							&:nth-child(#{$i + 1}) {
								span {
									transition: all 0.4s var(--ease) calc(#{$i} * 0.2s);
								}
							}
						}
					}
				}
			}
		}
		&.finish {
			.formPanel {
				width: 66%;
				.wrapper {
					transition: all calc(var(--cardsTranslationDuration)) var(--ease) calc(var(--cardsTranslationDelay) * 1.5);
					opacity: 1;
					transform: none;
				}
			}
			.cards {
				.card {
					transition-delay: 0s;
				}
			}
		}
	}

	&.step__1 {
		.step2 {
			opacity: 0;
			pointer-events: none;
			transform: translateY(5%) scale(0.97);
		}
	}

	&.step__2 {
		.step1 {
			opacity: 0;
			transform: translateY(-5%) scale(0.97);
			pointer-events: none;
		}
		.step2 {
			transition-delay: var(--stepTransitionDuration);
		}
	}
}
</style>
