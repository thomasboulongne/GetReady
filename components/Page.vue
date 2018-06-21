<template>
	<section :class="['page']" :style="{ '--currentColor': page.color }">
		<component :is="component" :content="page.page"></component>
		<footer>
			slt c le footer
		</footer>
	</section>
</template>

<script>
import Organize from '~/components/Organize';
export default {
	computed: {
		page: function() {
			return this.$t('categories.items').find(cat => cat.slug === this.$route.params.slug);
		},
		component: function() {
			switch (this.$t('categories.items').findIndex(cat => cat.slug === this.$route.params.slug)) {
				case 0:
					return Organize;
			}
		}
	},
	components: {
		Organize
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
	b {
		font-weight: 600;
		font-style: italic;
	}
	a {
		color: black;
		font-style: italic;
		font-weight: 600;
	}
	.emphasedText {
		font-size: 1.77rem;
		color: var(--grey);
		font-family: 'Antonio';
		max-width: 30rem;
		font-weight: normal;
	}
	.illustration.withShadow {
		position: relative;
		img {
			width: 100%;
			display: block;
			position: relative;
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
	.example {
		display: flex;
		margin-top: 2rem;
		max-width: 80%;
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
	.coloredBackground {
		background-color: var(--lightGrey);
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		clip-path: polygon(0 15%, 100% 0%, 100% 100%, 0% 100%);
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
		p {
			max-width: 30rem;
		}
		.blocks {
			display: flex;
			width: 100%;
			max-width: 70rem;
			margin: auto;
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
					width: 25%;
					top: 0;
					right: 10%;
					transform: translateY(-50%);
					img {
						width: 100%;
					}
				}
				&:nth-child(1) {
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
						width: 36%;
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
		.content {
			display: flex;
			position: relative;
			.illustration {
				width: 33%;
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
					--sliderIndicatorWidth: var(--cardWidth);
					.items {
						.cardComp {
							--cardBoxShadowOpacity: 0.1;
							background-color: var(--lightGrey);
							p {
								max-width: none;
							}
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
								width: 100%;
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
	.quotes {
		position: relative;
		padding-bottom: 8rem;
		h2 {
			position: relative;
			z-index: 1;
			margin-bottom: 0;
		}
		.coloredBackground {
			top: 1.9rem;
			clip-path: polygon(0 0%, 100% 0%, 100% 85%, 0% 100%);
		}
		.slider {
			overflow: hidden;
			.items {
				margin-top: 1rem;
				--celebrityWidth: 39rem;
				position: relative;
				left: calc(50% - var(--celebrityWidth) / 2);
			}
			.sliderIndicator {
				margin-left: var(--spacingHorizontal);
				width: 25%;
			}
		}
	}
	.lastPart {
		margin-top: 6rem;
		.blocks {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 var(--spacingHorizontalLarge);
			.block {
				width: 100%;
				max-width: 80rem;
				display: flex;
				margin-top: 6rem;
				.illustration {
					width: 50%;
					flex-shrink: 0;
					display: flex;
					video {
						border-radius: 1rem;
						object-fit: cover;
						width: calc(100% - 10rem);
					}
				}
				.content {
					h3 {
						margin-top: 0;
						display: inline-block;
						max-width: 50%;
					}
				}
				&:nth-child(2n) {
					.illustration {
						order: 2;
						justify-content: flex-end;
					}
				}
				.inputQuestion {
					font-size: 0.9rem;
					font-weight: bold;
					color: var(--grey);
				}
				.inputsWrapper {
					margin-top: 1rem;
				}
			}
		}
	}
}
</style>
