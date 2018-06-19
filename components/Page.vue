<template>
	<section :class="['page']" :style="{ '--currentColor': page.color }">
		<div class="pageIntro">
			<div class="definition">
				<h4 v-t="'Definition'"></h4>
				<p class="emphasedText" v-html="pageContent['Definition text']"></p>
			</div>
			<p v-html="pageContent['Goal types']['Intro text']"></p>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<img :src="pageContent['Goal types']['Main goal illustration']" alt="">
					</div>
					<div class="title">
						<span>{{ pageContent['Goal types']['Main goal'].split('_')[0] }}</span>
						<span>{{ pageContent['Goal types']['Main goal'].split('_')[1] }}</span>
					</div>
					<p v-html="pageContent['Goal types']['Main goal text']"></p>
				</div>
				<div class="block">
					<div class="illustration">
						<img :src="pageContent['Goal types']['Sub goals illustration']" alt="">
					</div>
					<div class="title">
						<span>{{ pageContent['Goal types']['Sub goals'].split('_')[0] }}</span>
						<span>{{ pageContent['Goal types']['Sub goals'].split('_')[1] }}</span>
					</div>
					<p v-html="pageContent['Goal types']['Sub goals text']"></p>
				</div>
			</div>
		</div>
		<div class="mainQuote">
			<div class="background"></div>
			<div class="content">
				<div class="illustration">
					<img class="shadow" :src="pageContent['Main quote']['Image']" alt="">
					<img :src="pageContent['Main quote']['Image']" alt="">
				</div>
				<div class="text">
					<svg width="40" height="32" viewBox="0 0 40 32">
						<g fill="#FF7056" fill-rule="nonzero" stroke="#FF7056">
							<path d="M27.895 17.404c.854.255 1.709.384 2.54.384a7.752 7.752 0 0 0 3.186-.676c-.801 3.035-2.725 8.272-6.557 8.862a.922.922 0 0 0-.742.678l-.838 3.1a.97.97 0 0 0 .116.771c.145.228.377.38.637.417.283.04.571.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C35.294 2.3 33.025 1.12 30.105 1h-.035c-3.603 0-6.797 2.512-7.77 6.108a8.561 8.561 0 0 0 .74 6.35 8.145 8.145 0 0 0 4.854 3.946zM2.042 13.457a8.144 8.144 0 0 0 4.853 3.947c.854.255 1.709.384 2.54.384a7.754 7.754 0 0 0 3.186-.675c-.8 3.034-2.724 8.271-6.557 8.86a.922.922 0 0 0-.742.679l-.838 3.1a.97.97 0 0 0 .116.771c.144.228.376.38.637.417.282.04.57.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C14.294 2.3 12.025 1.118 9.105 1H9.07C5.468 1 2.273 3.512 1.301 7.108a8.566 8.566 0 0 0 .74 6.35z"/>
						</g>
					</svg>
					<div class="quote" v-html="pageContent['Main quote']['Quote']"></div>
					<div class="athlete">
						<span class="name" v-html="pageContent['Main quote']['Athlete']"></span>
						<span class="description" v-html="pageContent['Main quote']['Athlete description']"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="mainPart">
			<h2>
				<span v-html="pageContent['Main part']['Title'].split('_')[0]"></span>
				<span v-html="pageContent['Main part']['Title'].split('_')[1]"></span>
			</h2>
			<div class="blocks">
				<div class="block block__1">
					<h3 v-html="pageContent['Main part']['Parts'][0]['Title']"></h3>
					<p class="blockIntroText" v-html="pageContent['Main part']['Parts'][0]['Text']"></p>
					<ul class="cards" v-hammer:pan.horizontal="cardsPan" ref="cards" @mousedown="cardsGrabCursor" @mouseup="cardsDefaultCursor" :style="{'cursor': cardsCursor ? '-webkit-grabbing' : '-webkit-grab'}">
						<li class="card" v-for="card in $t('cards')" :key="card.title">
							<card-comp :card="card"></card-comp>
						</li>
					</ul>
					<div class="cardsSliderIndicator" :style="{'--cardsPercentage': cardsSliderPercentage + '%'}"></div>
				</div>
				<div class="block block__2">
					<h3 v-html="pageContent['Main part']['Parts'][1]['Title']"></h3>
					<ol class="blockSteps">
						<li class="blockStep" v-for="(step, i) in pageContent['Main part']['Parts'][1]['Steps']" :key="i" :data-count="i + 1 < 10 ? '0' + (i + 1) : i + 1">
							<div class="stepContent">
								<div class="title" v-html="step.Title"></div>
								<div class="text" v-html="step.Text"></div>
								<div class="example" v-if="step.Example">
									<span class="label" v-t="'Example'"></span>
									<div class="simple">
										<div class="sentence">
											<span v-html="step.Example"></span>
										</div>
									</div>
								</div>
								<div class="example" v-if="step.ExampleSteps">
									<span class="label" v-t="'Example'"></span>
									<div class="multiple">
										<ol>
											<li v-for="(exampleStep, j) in step.ExampleSteps" :key="j" :data-count="j + 1">
												<div class="sentence">
													<span v-html="exampleStep"></span>
												</div>
											</li>
										</ol>
									</div>
								</div>
								<text-input-comp v-if="step['Input text']" :storeIdentifier="step['Input Store identifier']">{{ step['Input text'] }}</text-input-comp>
							</div>
						</li>
					</ol>
				</div>
				<div class="block block__3">
					<h3 v-html="pageContent['Main part']['Parts'][2]['Title']"></h3>
					<p class="blockIntroText" v-html="pageContent['Main part']['Parts'][2]['Text']"></p>
					<div class="detailsWrapper">
						<ul class="details">
							<li v-for="(detail, j) in pageContent['Main part']['Parts'][2]['Details']" :key="j" v-html="detail">
							</li>
						</ul>
					</div>
					<div class="example">
						<span class="label" v-t="'Example'"></span>
						<div class="multiple">
							<ol>
								<li v-for="(exampleStep, j) in pageContent['Main part']['Parts'][2]['ExampleSteps']" :key="j" :data-count="j + 1">
									<div class="sentence">
										<span v-html="exampleStep"></span>
									</div>
								</li>
							</ol>
						</div>
					</div>
				</div>
				<div class="block block__4">
					<h3 v-html="pageContent['Main part']['Parts'][3]['Title']"></h3>
					<p class="blockIntroText" v-html="pageContent['Main part']['Parts'][3]['Text']"></p>
					<div class="detailsWrapper">
						<ul class="details">
							<li v-for="(detail, j) in pageContent['Main part']['Parts'][3]['Details']" :key="j" v-html="detail">
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import CardComp from '~/components/Card';
import TextInputComp from '~/components/TextInput';
export default {
	data() {
		return {
			cardsX: 0,
			cardsCursor: false,
			cardsSliderPercentage: 0,
			currentCardsX: 0
		};
	},
	computed: {
		page: function() {
			return this.$t('categories.items[0]');
		},
		pageContent: function() {
			return this.page.page;
		}
	},
	components: {
		CardComp,
		TextInputComp
	},
	watch: {
		'currentCardsX': function(x) {
			const cards = Object.values(this.$t('cards'));
			const cardWidth = this.$refs.cards.querySelector('.card').getBoundingClientRect().width;
			const fullWidth = (cardWidth * cards.length) - cardWidth;
			this.cardsSliderPercentage = (x * 100 / fullWidth).toFixed(2) * -1;
		}
	},
	methods: {
		cardsPan(event) {
			const computedX = this.cardsX + event.deltaX;
			const cards = Object.values(this.$t('cards'));
			const cardWidth = this.$refs.cards.querySelector('.card').getBoundingClientRect().width;
			const fullWidth = (cardWidth * cards.length) - cardWidth;
			let newX = computedX;
			TweenMax.set(this.$refs.cards, {
				x: newX
			});
			TweenMax.set(this, {
				currentCardsX: newX
			});
			if (event.isFinal) {
				newX = computedX + event.velocityX * 50;
				let backX = null;
				if (newX > 0) {
					backX = 0;
				} else if (newX < fullWidth * -1) {
					backX = fullWidth * -1;
				}
				const tl = new TimelineMax({ paused: true });

				tl
				.to(this.$refs.cards, backX === null ? 0.5 : 0.1, {
					x: newX
				})
				.to(this, backX === null ? 0.5 : 0.1, {
					currentCardsX: newX
				}, 0);

				if (backX !== null) {
					const backDuration = 0.9;
					tl
					.to(this.$refs.cards, backDuration, {
						x: backX,
						ease: Power4.easeOut
					})
					.to(this, backDuration, {
						currentCardsX: backX,
						ease: Power4.easeOut
					}, '-=' + backDuration);
				}
				tl.play();
				this.cardsX = backX === null ? newX : backX;
			}
		},
		cardsGrabCursor() {
			this.cardsCursor = true;
		},
		cardsDefaultCursor() {
			this.cardsCursor = false;
		}
	}
};
</script>

<style lang="scss">
.page {
	height: auto;
	background-color: white;
	top: -38vh;
	position: relative;
	padding-top: 20vh;
	p {
		line-height: 1.82;
	}
	h2 {
		text-transform: uppercase;
		color: var(--grey);
		font-weight: bold;
	}
	h3 {
		font-size: 2.05rem;
		font-weight: bold;
		color: var(--currentColor);
	}
	h4 {
		color: var(--currentColor);
	}
	ol {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	&:before {
		content: '';
		position: absolute;
		top: 0;
		height: 20vh;
		width: 1px;
		left: var(--spacingHorizontalLarge);
		display: block;
		background: #c1cbe0;
	}
	.emphasedText {
		font-size: 1.77rem;
		color: var(--grey);
		font-family: 'Antonio';
		max-width: 30rem;
		font-weight: normal;
	}

	.example {
		display: flex;
		margin-top: 2rem;
		.label {
			font-size: 0.72rem;
			text-transform: uppercase;
			font-weight: normal;
			line-height: 2.5;
			color: var(--mediumGrey);
			vertical-align: baseline;
			margin-right: 2rem;
		}
		.simple, li {
			font-style: italic;
			width: 70%;
			display: flex;
			.sentence {
				font-size: 0.9rem;
				vertical-align: top;
				position: relative;
				display: inline;
				span {
					position: relative;
				}
			}
		}
		.simple, .multiple li:first-child {
			.sentence {
				span {
					display: inline;
					// border-bottom: 0.5em solid  var(--lightBlue);
					// &:before {
					// 	content: '';
					// 	display: block;
					// }
				}
			}
		}
		.multiple {
			li {
				--opacity: 1;
				font-size: 0.66rem;
				--circleSize: 1.9em;
				line-height: 1.8;
				&:before { // Number
					flex-shrink: 0;
					content: attr(data-count);
					border: solid var(--currentColor) 1px;
					height: var(--circleSize);
					width: var(--circleSize);
					display: inline-block;
					border-radius: var(--circleSize);
					text-align: center;
					font-style: normal;
					font-weight: bold;
					color: var(--currentColor);
					line-height: calc(var(--circleSize));
					margin-right: 1rem;
					background: white;
					position: relative;
					z-index: 1;
				}
				opacity: var(--opacity);
				&:first-child {
					opacity: 1;
					&:before {
						border: solid var(--currentColor) 1px;
						background-color: var(--currentColor);
						color: white;
					}
					&:after {
						opacity: var(--opacity);
					}
				}
				&:not(:last-child) {
					padding-bottom: 0.7rem;
					position: relative;
					&:after { // Line
						content: '';
						z-index: 0;
						width: 1px;
						height: calc(100% - 0.8em);
						background-color: var(--currentColor);
						display: block;
						position: absolute;
						left: calc((var(--circleSize) / 2) + 1px);
						top: var(--circleSize);
					}
				}
			}
		}
	}

	.detailsWrapper {
		display: flex;
		font-size: 1.16rem;
		margin: 3rem 0 4rem;
		&:before {
			content: '';
			width: 2.5rem;
			flex-shrink: 0;
			height: 1px;
			background-color: var(--currentColor);
			margin-right: 1.5rem;
			transform: translateY(0.7em)
		}
		.details {
			li {
				font-style: italic;
				font-weight: bold;
				&:not(:last-child) {
					margin-bottom: 1.5rem;
				}
			}
		}
	}

	.pageIntro {
		margin: 0 var(--spacingHorizontalLarge);
		.definition {
		}
		p {
			max-width: 30rem;
		}
		.blocks {
			display: flex;
			width: 100%;
			justify-content: space-between;
			margin-top: 12rem;
			.block {
				background-color: var(--lightGrey);
				padding: 1.5em;
				padding-top: 8rem;
				width: 46%;
				box-sizing: border-box;
				border-radius: 1em;
				box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.05);
				position: relative;
				.title {
					font-family: 'Antonio';
					color: var(--grey);
					text-transform: uppercase;
					font-size: 1.77rem;
					font-weight: bold;
					line-height: 1.2;
					span:last-child {
						display: block;
						font-size: 1.59em;
					}
				}
				p {
					width: 100%;
				}
				.illustration {
					position: absolute;
					width: 33%;
					top: 0;
					right: 10%;
					transform: translateY(-50%);
					img {
						width: 100%;
					}
				}
				&:nth-child(1){
					.illustration:after {
						content: '';
						position: absolute;
						top: 110%;
						height: 0.7rem;
						width: 80%;
						border-radius: 100%;
						background: rgba(0, 0, 0, 0.05);
						left: 50%;
						transform: translateX(-50%);
					}
				}
				&:nth-child(2){
					transform: translateY(-5rem);
					.illustration {
						perspective: 100rem;
						perspective-origin: bottom right;
						&:after {
							content: '';
							position: absolute;
							top: 110%;
							height: 2rem;
							width: 100%;
							background: rgba(0, 0, 0, 0.05);
							left: 50%;
							transform: translateX(-50%);
							--pathOffset: 20%;
							clip-path: polygon(0 var(--pathOffset), var(--pathOffset) 0, 100% calc(100% - var(--pathOffset)), calc(100% - var(--pathOffset)) 100%);
						}
					}
				}
			}
		}
	}
	.mainQuote {
		margin-top: 2rem;
		margin-bottom: 2rem;
		padding: 6.5rem 0 0 0;
		position: relative;
		.background {
			background-color: var(--lightGrey);
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			clip-path: polygon(0 15%, 100% 0%, 100% 93%, 0% 100%);
		}
		.content {
			display: flex;
			position: relative;
			.illustration {
				width: 33%;
				position: relative;
				img {
					width: 100%;
					display: block;
					&.shadow {
						position: absolute;
						top: 50%;
						left: 50%;
						filter: grayscale(1) brightness(0);
						opacity: 0.15;
						transform: translate(-53%, -55%);
					}
				}
			}
			.text {
				width: 66%;
				svg {
					* {
						fill: var(--currentColor);
					}
				}
				.quote {
					width: 75%;
					line-height: 2;
					font-style: italic;
					margin: 2rem 0;
					font-size: 1.1rem;
				}
				.athlete {
					.name {
						font-family: Antonio;
						font-size: 1.1rem;
						font-weight: bold;
						color: var(--currentColor);
						text-transform: uppercase;
						display: block;
					}
					.description {
						font-style: italic;
						font-size: 0.7rem;
						margin-top: 1rem;
						display: inline-block;
						width: 33%;
						font-weight: 300;
					}
				}
			}
		}
	}
	.mainPart {
		overflow: hidden;
		margin-top: 6rem;
		padding-bottom: 3rem;
		h2 {
			display: block;
			margin-left: var(--spacingHorizontal);
			font-size: 2.6rem;
			span {
				display: block;
				&:last-child {
					font-size: 1.7em;
					line-height: 1.1;
				}
			}
		}
		.blocks {
			margin-top: 5rem;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			.block {
				width: 66%;
				margin-bottom: 4rem;
				.blockIntroText {
					max-width: 70%;
				}
				&.block__1 {
					.cards {
						margin-top:4rem;
						display: flex;
						flex-wrap: nowrap;
						.card {
							&:not(:last-child) {
								padding-right: 2rem;
							}
						}
						.cardComp {
							--cardBoxShadowOpacity: 0.1;
							background-color: var(--lightGrey);
							p {
								max-width: none;
							}
						}
					}
					.cardsSliderIndicator {
						width: var(--cardWidth);
						height: 1px;
						background-color: var(--mediumGrey);
						margin-top: 3rem;
						position: relative;
						overflow: hidden;
						&:after {
							content: '';
							position: absolute;
							--cardsIndicatorWidth: 33%;
							width: var(--cardsIndicatorWidth);
							left: calc(var(--cardsPercentage) * 2/3);
							top: 0;
							height: 1px;
							background-color: var(--currentColor);
						}
					}
				}
				&.block__2 {
					.blockSteps {
						.blockStep {
							display: flex;
							&:not(:last-child) {
								margin-bottom: 3rem;
							}
							&:before {
								content: attr(data-count);
								display: inline-block;
								color: var(--currentColor);
								font-family: 'Antonio';
								font-weight: bold;
								font-size: 1.2rem;
							}
							.stepContent {
								margin-left: 2rem;
								line-height: 1.8;
								.title {
									font-weight: bold;
									max-width: 66%;
								}
								.text {
									max-width: 66%;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
