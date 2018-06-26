<template>
	<div class="visualize categoryPage">
		<page-intro-comp :intro="content['Intro']"></page-intro-comp>
		<main-quote-comp :quote="content['Main quote']"></main-quote-comp>
		<study-comp :study="content['Study']"></study-comp>
		<div class="section hasBackground">
			<h2>
				<span v-html="content['Sections'][0].Title.split('_')[0]"></span>
				<span v-html="content['Sections'][0].Title.split('_')[1]"></span>
			</h2>
			<page-intro-comp :background="true" :intro="content['Sections'][0]['Intro']" :definition="false"></page-intro-comp>
		</div>
		<div class="section">
			<h2>
				<span v-html="content['Sections'][1].Title.split('_')[0]"></span>
				<span v-html="content['Sections'][1].Title.split('_')[1]"></span>
			</h2>
			<page-intro-comp :intro="content['Sections'][1]['Intro']" :definition="false" :aligned="true"></page-intro-comp>
			<detailed-blocks-comp :blocks="content['Sections'][1]['POV']" :shadow="false"></detailed-blocks-comp>
		</div>
		<div class="section" ref="typeSection">
			<h2>
				<span v-html="content['Sections'][2].Title.split('_')[0]"></span>
				<span v-html="content['Sections'][2].Title.split('_')[1]"></span>
			</h2>
			<page-intro-comp :intro="content['Sections'][2]['Intro']" :definition="false" :aligned="true"></page-intro-comp>
			<div class="typesGrid">
				<ul class="types">
					<li v-for="(type, i) in content['Sections'][2]['Types']" :key="type['Name']" class="type" @mouseenter="playVideo(i)" @mouseleave="stopVideo(i)">
						<video playsinline muted loop :data-src="PATH + type['Illustration']" ref="videos"></video>
						<span class="title" v-html="type['Name']"></span>
						<span class="description" v-html="type['Description']"></span>
						<div class="example">
							<div class="label" v-t="'Example'"></div>
							<div class="simple">
								<div class="sentence">
									<span v-html="type['Example']"></span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<famous-quotes-comp :quotes="content['Quotes']"></famous-quotes-comp>
		<div class="application">
			<div class="textBackground" v-t="'application'"></div>
			<div class="content">
				<div class="title">
					<span v-html="content['Application']['Title'].split('_')[0]"></span>
					<span v-html="content['Application']['Title'].split('_')[1]"></span>
				</div>
				<span class="duration" v-html="content['Application']['Duration']"></span>
				<div class="player">
					<div class="play">
						<svg viewBox="0 0 100 100" height="100" width="100">
							<path fill-rule="evenodd" fill="#000000" d="M0,50 C0,22.3857625 22.3796909,0 50,0 C77.6142375,0 100,22.3796909 100,50 C100,77.6142375 77.6203091,100 50,100 C22.3857625,100 0,77.6203091 0,50 L0,50 Z M69.562304,52.4504362 L43.7392652,69.3676758 C41.674126,70.7205938 40,69.8291419 40,67.3934481 L40,32.6080749 C40,30.1648211 41.674252,29.2810117 43.7392652,30.6338472 L69.562304,47.5510868 C71.6274431,48.9040048 71.6273172,51.0976007 69.562304,52.4504362 L69.562304,52.4504362 Z"/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import PageIntroComp from '~/components/PageIntro';
import MainQuoteComp from '~/components/MainQuote';
import DetailedBlocksComp from '~/components/DetailedBlocks';
import FamousQuotesComp from '~/components/FamousQuotes';
import StudyComp from '~/components/Study';
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
			PATH: process.env.PATH,
			videosAreLoaded: false
		};
	},
	watch: {
		'$store.getters.scrollPosition.y': function() {
			this.loadVideos();
		}
	},
	mounted() {
		this.loadVideos();
	},
	methods: {
		loadVideos() {
			if (!this.videosAreLoaded) {
				const rect = this.$refs.typeSection.getBoundingClientRect();
				if (rect.top < this.$store.getters.viewportSize.height * 1.5) {
					this.$refs.videos.forEach(video => {
						video.setAttribute('src', video.getAttribute('data-src'));
					});
					this.videosAreLoaded = true;
				}
			}
		},
		playVideo(i) {
			this.$refs.videos[i].play()
			.catch(() => {});
		},
		stopVideo(i) {
			this.$refs.videos[i].pause();
		}
	},
	components: {
		PageIntroComp,
		MainQuoteComp,
		DetailedBlocksComp,
		FamousQuotesComp,
		StudyComp
	}
};
</script>
<style lang="scss">
.visualize {
	.section {
		padding-top: var(--spacing-horizontal);
		&.hasBackground {
			background-color: var(--light-grey);
		}
	}
	.mainQuote {
		margin-bottom: 0;
	}

	.typesGrid {
		width: 100%;
		.types {
			margin: auto;
			display: block;
			column-count: 3;
			width: 100%;
			max-width: 70rem;
			column-gap: 4rem;
			overflow: hidden;
			position: relative;
			.type {
				display: inline-flex;
				flex-direction: column;
				align-items: center;
   				break-inside: avoid-column;
				text-align: center;
				margin-bottom: 4rem;
				video {
					width: 100%;
					height: auto;
					border-radius: 1rem;
					transform: translate3d(0,0,0);
				}
				.title {
					font-family: 'Antonio';
					font-size: 1.77rem;
					font-weight: 600;
					margin: 1.5rem 0;
					text-transform: uppercase;
				}
				.example {
					flex-direction: column;
					align-items: center;
					margin-top: 1rem;
					max-width: none;;
					.label {
						margin: 0;
						margin-bottom: 1rem;
					}
					.simple {
						width: 100%;
					}
				}
			}
		}
	}

	.application {
		position: relative;
		border-radius: 1rem;
		background-color: var(--current-color);
		width: 80%;
		max-width: 80rem;
		margin: auto;
		box-sizing: border-box;
		padding-top: 5.5rem;
		color: white;
		margin-top: 5rem;
		.textBackground {
			position: absolute;
			opacity: 0.16;
			font-size: 10rem;
			font-family: 'Antonio';
			font-weight: 600;
			top: 12rem;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.content {
			display: flex;
			flex-direction: column;
			height: 100%;
			width: 100%;
			align-items: center;
			justify-content: center;
			padding: 5rem;
			box-sizing: border-box;
			.title {
				font-family: 'Antonio';
				text-transform: uppercase;
				font-weight: 600;
				text-align: center;
				span {
					display: block;
				}
				span:first-child {
					font-size: 1.77rem;
				}
				span:last-child {
					font-size: 4.16rem;
				}
			}
			.duration {
				margin: 2rem;
			}
			.player {
				svg {
					path {
						fill: white;
					}
				}
			}
		}
	}
}
</style>
