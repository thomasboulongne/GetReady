<template>
	<div class="pageIntro">
		<div class="left">
			<div class="definition">
				<h4 v-t="'Definition'" v-if="definition"></h4>
				<p class="emphasedText" v-html="intro['Text']"></p>
			</div>
			<p v-html="intro['Long text']"></p>
		</div>
		<div class="right" v-if="intro['Image']">
			<img :src="PATH + intro['Image']" alt="">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		intro: {
			default: function() {
				return {};
			}
		},
		definition: {
			default: true
		}
	},
	data() {
		return {
			PATH: process.env.PATH
		}
	}
};
</script>
<style lang="scss">
.pageIntro {
	display: flex;
	width: 100%;
	padding: 0 var(--spacingHorizontalLarge) var(--spacingHorizontal);
	box-sizing: border-box;
	.left, .right {
		flex-shrink: 0;
		flex-grow: 0;
		box-sizing: border-box;
	}
	.left {
		width: 60%;
		padding-right: var(--spacingHorizontal);
	}
	.right {
		width: 40%;
	}
	img {
		width: 80%;
	}
}
</style>
