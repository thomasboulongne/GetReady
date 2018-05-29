<template>
	<div :class="['intro', 'step__' + step]" @click.shift="toggleCards">
		<div class="step step1">
			<div class="sentences">
				<div class="sentence" v-for="i in 3" :key="i" ref="sentences">
					<span v-for="(word, j) in $t('sentences.' + i).split(' ')" :key="j">{{ word }} </span>
				</div>
			</div>
			<div :class="['button__next', showNextButton ? 'show' : '']" @click="goToStep(2)">
				<span>{{ $t('next') }}</span>
				<img src="~/assets/images/arrow@3x.png"/>
			</div>
		</div>
		<div :class="['step', 'step2', cardsStatus]">
			<span class="heading">Un bon objectif devrait être :</span>
			<div :class="['cards',]" :style="{'--cardsTranslationDuration': cardsTranslationDuration + 'ms', '--singleCardTranslationDuration': cardsTranslationDuration / cards.length + 'ms'}">
				<div :class="['card']" v-for="(card, i) in cards" ref="cards" :key="card.title + i">
					<div class="illustration">
						<img :src="card.img" alt="" class="shadow">
						<img :src="card.img" alt="">
					</div>
					<h3>{{ card.title }}</h3>
					<p v-html="card.text"></p>
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
				}
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
			// switch (this.cardsStatus) {
			// 	case 'beforeEnter':
			// 		this.cardsStatus = 'onEnter';
			// 		break;
			// 	case 'onEnter':
			// 		this.cardsStatus = 'afterEnter';
			// 		break;
			// 	case 'afterEnter':
			// 		this.cardsStatus = 'finish';
			// 		break;
			// 	default:
			// 		this.cardsStatus = 'beforeEnter';
			// 		break;
			// }
			this.goToStep(2);
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
		.heading {
			position: absolute;
			top: 10%;
			left: 50%;
			transform: translateX(-50%);
			font-size: 2rem;
			transition: all 0.4s var(--ease) 1.5s;
		}
		.cards {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			--cardsTranslationDelay: var(--cardsTranslationDuration);
			transition: transform var(--cardsTranslationDuration) var(--ease) var(--cardsTranslationDelay);
			transform: translate(calc(50% - 25vw), -50%);
			.card {
				--cardWidth: 22rem;
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
				&:nth-child(1) {
					--cardRotate: 3deg;
				}
				&:nth-child(2) {
					--cardRotate: -2deg;
				}
				&:nth-child(3) {
					--cardRotate: 2deg;
				}
				&:nth-child(4) {
					--cardRotate: 0deg;
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
		}
		&.afterEnter {
		}
		&.finish {
			.heading {
				transform: translate(-50%, -50%);
				opacity: 0;
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
