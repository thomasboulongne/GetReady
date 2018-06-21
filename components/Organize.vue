<template>
	<div class="organize">
		<div class="pageIntro">
			<div class="definition">
				<h4 v-t="'Definition'"></h4>
				<p class="emphasedText" v-html="content['Definition text']"></p>
			</div>
			<p v-html="content['Goal types']['Intro text']"></p>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<img :src="PATH + content['Goal types']['Main goal illustration']" alt="">
					</div>
					<div class="title">
						<span>{{ content['Goal types']['Main goal'].split('_')[0] }}</span>
						<span>{{ content['Goal types']['Main goal'].split('_')[1] }}</span>
					</div>
					<p v-html="content['Goal types']['Main goal text']"></p>
				</div>
				<div class="block">
					<div class="illustration">
						<img :src="PATH + content['Goal types']['Sub goals illustration']" alt="">
					</div>
					<div class="title">
						<span>{{ content['Goal types']['Sub goals'].split('_')[0] }}</span>
						<span>{{ content['Goal types']['Sub goals'].split('_')[1] }}</span>
					</div>
					<p v-html="content['Goal types']['Sub goals text']"></p>
				</div>
			</div>
		</div>
		<div class="mainQuote">
			<div class="coloredBackground"></div>
			<div class="content">
				<div class="illustration withShadow">
					<img class="shadow" :src="PATH + content['Main quote']['Image']" alt="">
					<img :src="PATH + content['Main quote']['Image']" alt="">
				</div>
				<div class="text">
					<svg width="40" height="32" viewBox="0 0 40 32">
						<g fill="#FF7056" fill-rule="nonzero">
							<path d="M27.895 17.404c.854.255 1.709.384 2.54.384a7.752 7.752 0 0 0 3.186-.676c-.801 3.035-2.725 8.272-6.557 8.862a.922.922 0 0 0-.742.678l-.838 3.1a.97.97 0 0 0 .116.771c.145.228.377.38.637.417.283.04.571.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C35.294 2.3 33.025 1.12 30.105 1h-.035c-3.603 0-6.797 2.512-7.77 6.108a8.561 8.561 0 0 0 .74 6.35 8.145 8.145 0 0 0 4.854 3.946zM2.042 13.457a8.144 8.144 0 0 0 4.853 3.947c.854.255 1.709.384 2.54.384a7.754 7.754 0 0 0 3.186-.675c-.8 3.034-2.724 8.271-6.557 8.86a.922.922 0 0 0-.742.679l-.838 3.1a.97.97 0 0 0 .116.771c.144.228.376.38.637.417.282.04.57.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C14.294 2.3 12.025 1.118 9.105 1H9.07C5.468 1 2.273 3.512 1.301 7.108a8.566 8.566 0 0 0 .74 6.35z"/>
						</g>
					</svg>
					<div class="quote" v-html="content['Main quote']['Quote']"></div>
					<div class="athlete">
						<span class="name" v-html="content['Main quote']['Athlete']"></span>
						<span class="description" v-html="content['Main quote']['Athlete description']"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="mainPart">
			<h2>
				<span v-html="content['Main part']['Title'].split('_')[0]"></span>
				<span v-html="content['Main part']['Title'].split('_')[1]"></span>
			</h2>
			<div class="blocks">
				<div class="block block__1">
					<h3 v-html="content['Main part']['Parts'][0]['Title']"></h3>
					<p class="blockIntroText" v-html="content['Main part']['Parts'][0]['Text']"></p>
					<slider-comp :items="Object.values($t('cards'))" :componentType="'CardComp'"></slider-comp>
				</div>
				<div class="block block__2">
					<h3 v-html="content['Main part']['Parts'][1]['Title']"></h3>
					<ol class="blockSteps">
						<li class="blockStep" v-for="(step, i) in content['Main part']['Parts'][1]['Steps']" :key="i" :data-count="i + 1 < 10 ? '0' + (i + 1) : i + 1">
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
					<h3 v-html="content['Main part']['Parts'][2]['Title']"></h3>
					<p class="blockIntroText" v-html="content['Main part']['Parts'][2]['Text']"></p>
					<div class="detailsWrapper">
						<ul class="details">
							<li v-for="(detail, j) in content['Main part']['Parts'][2]['Details']" :key="j" v-html="detail">
							</li>
						</ul>
					</div>
					<div class="example">
						<span class="label" v-t="'Example'"></span>
						<div class="multiple">
							<ol>
								<li v-for="(exampleStep, j) in content['Main part']['Parts'][2]['ExampleSteps']" :key="j" :data-count="j + 1">
									<div class="sentence">
										<span v-html="exampleStep"></span>
									</div>
								</li>
							</ol>
						</div>
					</div>
					<text-input-comp v-if="content['Main part']['Parts'][2]['Input text']" :storeIdentifier="content['Main part']['Parts'][2]['Input Store identifier']">{{ content['Main part']['Parts'][2]['Input text'] }}</text-input-comp>
				</div>
				<div class="block block__4">
					<h3 v-html="content['Main part']['Parts'][3]['Title']"></h3>
					<p class="blockIntroText" v-html="content['Main part']['Parts'][3]['Text']"></p>
					<div class="detailsWrapper">
						<ul class="details">
							<li v-for="(detail, j) in content['Main part']['Parts'][3]['Details']" :key="j" v-html="detail">
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="quotes">
			<div class="coloredBackground"></div>
			<div class="content">
				<h2>
					<span v-html="$t('These celebrities approve').split('_')[0]"></span>
					<span v-html="$t('These celebrities approve').split('_')[1]"></span>
				</h2>
				<slider-comp :items="content['Quotes']" :componentType="'CelebrityComp'"></slider-comp>
			</div>
		</div>
		<div class="lastPart">
			<h2>
				<span v-html="content['Last part'].Title.split('_')[0]"></span>
				<span v-html="content['Last part'].Title.split('_')[1]"></span>
			</h2>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][0].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][0].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][0].Text.split('\n').join('</p><p>') + '</p>'"></div>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][1].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][1].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][1].Text.split('\n').join('</p><p>') + '</p>'"></div>
						<span class="inputQuestion" v-html="content['Last part']['Blocks'][1]['Input question']"></span>
						<text-input-comp :storeIdentifier="content['Last part']['Blocks'][1]['Input store identifier']" :example="false" :labeled="false" :numbered="false"></text-input-comp>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][2].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][2].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][2].Text.split('\n').join('</p><p>') + '</p>'"></div>
						<double-text-input-comp :storeIdentifier="content['Last part']['Blocks'][2]['Input store identifier']" :prefix="content['Last part']['Blocks'][2]['Input prefix']" :conjunction="content['Last part']['Blocks'][2]['Input conjunction']"></double-text-input-comp>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][3].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][3].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][3].Text.split('\n').join('</p><p>') + '</p>'"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import TextInputComp from '~/components/TextInput';
import DoubleTextInputComp from '~/components/DoubleTextInput';
import SliderComp from '~/components/Slider';
export default {
	props: {
		content: {
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			PATH: process.env.PATH
		};
	},
	components: {
		TextInputComp,
		DoubleTextInputComp,
		SliderComp
	}
};
</script>
<style lang="scss">
.organize {
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
