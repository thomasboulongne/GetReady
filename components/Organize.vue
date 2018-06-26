<template>
	<div class="organize categoryPage">
		<page-intro-comp :intro="content['Intro']"></page-intro-comp>
		<detailed-blocks-comp :blocks="content['Goal types']"></detailed-blocks-comp>
		<main-quote-comp :quote="content['Main quote']"></main-quote-comp>
		<main-comp :title="content['Main part']['Title']">
			<div class="block block__1" slot="block">
				<h3 v-html="content['Main part']['Parts'][0]['Title']" :shortTitle="content['Main part']['Parts'][0]['Short title']"></h3>
				<p class="blockIntroText" v-html="content['Main part']['Parts'][0]['Text']"></p>
				<slider-comp :items="Object.values($t('cards'))" :componentType="'CardComp'"></slider-comp>
			</div>
			<div class="block block__2" slot="block">
				<h3 v-html="content['Main part']['Parts'][1]['Title']" :shortTitle="content['Main part']['Parts'][1]['Short title']"></h3>
				<ol class="blockSteps">
					<li class="blockStep" v-for="(step, i) in content['Main part']['Parts'][1]['Steps']" :key="i" :data-count="i + 1 < 10 ? '0' + (i + 1) : i + 1">
						<div class="stepContent">
							<div class="title" v-html="step.Title"></div>
							<div class="text" v-html="step.Text"></div>
							<div class="example" v-if="step.Example">
								<span class="label" v-t="'Example'"></span>
								<div class="simple">
									<div class="sentence">
										<span v-html="step.Example" class="exempleLine"></span>
									</div>
								</div>
							</div>
							<div class="example" v-if="step.ExampleSteps">
								<span class="label" v-t="'Example'"></span>
								<div class="multiple">
									<ol>
										<li v-for="(exampleStep, j) in step.ExampleSteps" :key="j" :data-count="j + 1">
											<div class="sentence">
												<span v-html="exampleStep" class="exempleLine"></span>
											</div>
										</li>
									</ol>
								</div>
							</div>
							<text-input-comp v-if="step['Input text']" :storeIdentifier="step['Input Store identifier']">{{ step['Input text'] }}</text-input-comp>
							<table-comp v-if="step['Column names']" :storeIdentifier="step['Input Store identifier']" :columnNames="step['Column names']" :values="step['Table values']">{{ step['Table text'] }}</table-comp>
						</div>
					</li>
				</ol>
			</div>
			<div class="block block__3" slot="block">
				<h3 v-html="content['Main part']['Parts'][2]['Title']" :shortTitle="content['Main part']['Parts'][2]['Short title']"></h3>
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
			<div class="block block__4" slot="block">
				<h3 v-html="content['Main part']['Parts'][3]['Title']" :shortTitle="content['Main part']['Parts'][3]['Short title']"></h3>
				<p class="blockIntroText" v-html="content['Main part']['Parts'][3]['Text']"></p>
				<div class="detailsWrapper">
					<ul class="details">
						<li v-for="(detail, j) in content['Main part']['Parts'][3]['Details']" :key="j" v-html="detail">
						</li>
					</ul>
				</div>
			</div>
		</main-comp>
		<famous-quotes-comp :quotes="content['Quotes']"></famous-quotes-comp>
		<div class="lastPart">
			<h2>
				<span v-html="content['Last part'].Title.split('_')[0]"></span>
				<span v-html="content['Last part'].Title.split('_')[1]"></span>
			</h2>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="PATH + content['Last part']['Blocks'][0].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][0].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][0].Text.split('\n').join('</p><p>') + '</p>'"></div>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="PATH + content['Last part']['Blocks'][1].Animation"></video>
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
						<video autoplay="true" playsinline muted loop :src="PATH + content['Last part']['Blocks'][2].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][2].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][2].Text.split('\n').join('</p><p>') + '</p>'"></div>
						<double-text-input-comp :storeIdentifier="content['Last part']['Blocks'][2]['Input store identifier']" :prefix="content['Last part']['Blocks'][2]['Input prefix']" :conjunction="content['Last part']['Blocks'][2]['Input conjunction']"></double-text-input-comp>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="PATH + content['Last part']['Blocks'][3].Animation"></video>
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
import TableComp from '~/components/Table';
import DoubleTextInputComp from '~/components/DoubleTextInput';
import SliderComp from '~/components/Slider';
import PageIntroComp from '~/components/PageIntro';
import MainComp from '~/components/Main';
import MainQuoteComp from '~/components/MainQuote';
import DetailedBlocksComp from '~/components/DetailedBlocks';
import FamousQuotesComp from '~/components/FamousQuotes';
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
		TableComp,
		DoubleTextInputComp,
		SliderComp,
		PageIntroComp,
		MainComp,
		MainQuoteComp,
		DetailedBlocksComp,
		FamousQuotesComp
	}
};
</script>
<style lang="scss">
.organize {
	.mainPart {
		.block__1 {
			--sliderIndicatorWidth: var(--card-width);
			.items {
				.cardComp {
					--cardBoxShadowOpacity: 0.1;
					background-color: var(--light-grey);
					p {
						max-width: none;
					}
				}
			}
		}
		.block__2 {
			.blockSteps {
				.blockStep {
					display: flex;
					&:not(:last-child) {
						margin-bottom: 3rem;
					}
					&:before {
						content: attr(data-count);
						display: inline-block;
						color: var(--current-color);
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
	.lastPart {
		margin-top: 6rem;
		.blocks {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 var(--spacing-horizontal-large);
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
