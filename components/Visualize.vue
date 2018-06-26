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
			<page-intro-comp :intro="content['Sections'][1]['Intro']" :definition="false"></page-intro-comp>
			<detailed-blocks-comp :blocks="content['Sections'][1]['POV']"></detailed-blocks-comp>
		</div>
		<div class="section" ref="typeSection">
			<h2>
				<span v-html="content['Sections'][2].Title.split('_')[0]"></span>
				<span v-html="content['Sections'][2].Title.split('_')[1]"></span>
			</h2>
			<page-intro-comp :intro="content['Sections'][2]['Intro']" :definition="false"></page-intro-comp>
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
		padding-top: var(--spacingHorizontal);
		&.hasBackground {
			background-color: var(--lightGrey);
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
}
</style>
