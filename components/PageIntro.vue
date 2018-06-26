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
			<video autoplay="true" playsinline muted loop :src="PATH + intro['Image']" alt=""></video>
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
			PATH: process.env.PATH,
			lineScale: 0,
			displayed: false
		};
	},
	watch: {
		'$store.getters.scrollPosition': function() {
			if (!this.displayed) {
				this.checkDisplay();
			}
		}
	},
	mounted() {
		// this.tl = new TimelineMax({ paused: true });
		// this.
	},
	methods: {
		checkDisplay() {
			const rect = this.$el.getBoundingClientRect();
			if (rect.top < this.$store.getters.viewportSize.height * 0.9) {
				this.show();
			}
		},
		show() {
		}
	}
};
</script>
<style lang="scss">
.pageIntro {
	display: flex;
	width: 100%;
	padding: 2rem var(--spacingHorizontalLarge) var(--spacingHorizontal);
	max-width: 90rem;
	box-sizing: border-box;
	margin: auto;
	.left, .right {
		flex-shrink: 0;
		flex-grow: 0;
		box-sizing: border-box;
	}
	.left {
		width: 60%;
		padding-right: var(--spacingHorizontal);
		.emphasedText {
			max-width: 80%;
		}
	}
	.right {
		width: 40%;
	}
	img, video {
		width: 80%;
		border-radius: 1rem;
		object-fit: cover;
	}
}
</style>
