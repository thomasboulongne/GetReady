<template>
	<div class="visualize categoryPage">
		<page-intro-comp :intro="content['Intro']"></page-intro-comp>
		<main-quote-comp :quote="content['Main quote']"></main-quote-comp>
		<div class="section">
			<h2>
				<span v-html="content['Sections'][0].Title.split('_')[0]"></span>
				<span v-html="content['Sections'][0].Title.split('_')[1]"></span>
			</h2>
			<page-intro-comp :intro="content['Sections'][0]['Intro']" :definition="false"></page-intro-comp>
			<detailed-blocks-comp :blocks="content['Sections'][0]['POV']"></detailed-blocks-comp>
		</div>
		<div class="section">
			<h2>
				<span v-html="content['Sections'][1].Title.split('_')[0]"></span>
				<span v-html="content['Sections'][1].Title.split('_')[1]"></span>
			</h2>
			<page-intro-comp :intro="content['Sections'][1]['Intro']" :definition="false"></page-intro-comp>
		</div>
		<famous-quotes-comp :quotes="content['Quotes']"></famous-quotes-comp>
	</div>
</template>
<script>
import PageIntroComp from '~/components/PageIntro';
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
		PageIntroComp,
		MainQuoteComp,
		DetailedBlocksComp,
		FamousQuotesComp
	}
};
</script>
<style lang="scss">
.visualize {
	.section {
		margin-top: var(--spacingHorizontal);
	}
}
</style>
