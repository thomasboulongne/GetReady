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
		<div class="step step2">
			<span class="heading">Un bon objectif devrait être :</span>
			<div class="cards">
				<div :class="['card', cardBeforeEnter ? 'beforeEnter' : '']" v-for="(card, i) in cards" ref="cards" :key="card.title + i">
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
	i18n: {
		messages: {
			en: {
				sentences: {
					1: 'Nous avons tous un objectif à atteindre.',
					2: 'Qu\'il soit sportif, personnel ou encore professionnel...',
					3: 'Et vous, quel est le votre ?'
				},
				cards: {
					1: {
						title: 'Mesurable',
						img: '~/assets/images/cards/mesurable.png',
						text: 'Il peut avoir un indicateur de résultat, ou à défaut, nos sens doivent nous permettre de déterminer précisément à quel moment l’objectif sera atteint.'
					},
					2: {
						title: 'Specific',
						img: '~/assets/images/cards/specific.png',
						text: 'Suffisamment précis, présenter des caractéristiques propres.'
					},
					3: {
						title: 'Mesurable',
						img: '~/assets/images/cards/mesurable.png',
						text: 'Il peut avoir un indicateur de résultat, ou à défaut, nos sens doivent nous permettre de déterminer précisément à quel moment l’objectif sera atteint.'
					},
					4: {
						title: 'Specific',
						img: '~/assets/images/cards/specific.png',
						text: 'Suffisamment préci, présenter des caractéristiques propres.'
					}
				}
			},
			fr: {
				sentences: {
					1: 'Nous avons tous un objectif à atteindre.',
					2: 'Qu\'il soit sportif, personnel ou encore professionnel...',
					3: 'Et vous, quel est le votre ?'
				},
				cards: {
					1: {
						title: 'Mesurable',
						text: 'Il peut avoir un indicateur de résultat, ou à défaut, nos sens doivent nous permettre de déterminer précisément à quel moment l’objectif sera atteint.'
					},
					2: {
						title: 'Spécifique',
						text: 'Suffisamment précis, présenter des caractéristiques propres.'
					},
					3: {
						title: 'Mesurable',
						text: 'Il peut avoir un indicateur de résultat, ou à défaut, nos sens doivent nous permettre de déterminer précisément à quel moment l’objectif sera atteint.'
					},
					4: {
						title: 'Spécifique',
						text: 'Suffisamment préci, présenter des caractéristiques propres.'
					}
				}
			}
		}
	},
	data() {
		return {
			showNextButton: false,
			step: 1,
			cardBeforeEnter: true,
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
			switch (index) {
				case 2:
					this.step = 2;
					setTimeout(() => {
						this.cardBeforeEnter = false;
					}, 1500);
					break;
				default:
					break;
			}
		},

		toggleCards() {
			this.cardBeforeEnter = !this.cardBeforeEnter;
		}
	}
};
</script>


<style lang="scss">
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
		}
		.cards {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
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
				transform: translate(-50%, -50%);
				box-shadow: 0 calc(var(--cardWidth) * 0.03) calc(var(--cardWidth) * 0.07) rgba(0, 0, 0, 0.05);
				padding: calc(var(--cardWidth) * 0.1);
				box-sizing: border-box;
				text-align: center;
				opacity: 1;
				@for $j from 1 to 30 {
					&:nth-child(#{$j}) {
						transition: transform 0.5s var(--ease) calc((#{$j} - 0.5) * 0.1s), opacity 0.2s calc((#{$j} - 0.5) * 0.1s);
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
					transform: translate(-50%, -50%) rotate(3deg);
				}
				&:nth-child(2) {
					transform: translate(-50%, -50%) rotate(-2deg);
				}
				&:nth-child(3) {
					transform: translate(-50%, -50%) rotate(2deg);
				}
				&:nth-child(4) {
					transform: translate(-50%, -50%) rotate(0deg);
				}
				&.beforeEnter {
					opacity: 0;
					transform: translate(calc(-50% + 50vw), -20%) rotate(20deg);
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
