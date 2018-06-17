<template>
	<section :class="['page']" :style="{ '--currentColor': page.color }">
		<div class="pageIntro">
			<div class="definition">
				<h4 v-t="'Definition'"></h4>
				<p class="emphasedText" v-t="'categories.items[0].page[\'Definition text\']'"></p>
			</div>
			<p v-t="'categories.items[0].page[\'Goal types\'][\'Intro text\']'"></p>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<img :src="$t('categories.items[0].page[\'Goal types\'][\'Main goal illustration\']')" alt="">
					</div>
					<div class="title">
						<span>{{ $t('categories.items[0].page[\'Goal types\'][\'Main goal\']').split('_')[0] }}</span>
						<span>{{ $t('categories.items[0].page[\'Goal types\'][\'Main goal\']').split('_')[1] }}</span>
					</div>
					<p v-t="'categories.items[0].page[\'Goal types\'][\'Main goal text\']'"></p>
				</div>
				<div class="block">
					<div class="illustration">
						<img :src="$t('categories.items[0].page[\'Goal types\'][\'Sub goals illustration\']')" alt="">
					</div>
					<div class="title">
						<span>{{ $t('categories.items[0].page[\'Goal types\'][\'Sub goals\']').split('_')[0] }}</span>
						<span>{{ $t('categories.items[0].page[\'Goal types\'][\'Sub goals\']').split('_')[1] }}</span>
					</div>
					<p v-t="'categories.items[0].page[\'Goal types\'][\'Sub goals text\']'"></p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	computed: {
		page: function() {
			return this.$t('categories.items[0]');
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
	h4 {
		color: var(--currentColor);
	}
	&::before {
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
			.block {
				background-color: var(--lightGrey);
				padding: 1.5em;
				width: 48%;
				box-sizing: border-box;
				border-radius: 1em;
				box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.05);
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
			}
		}
	}
}
</style>
