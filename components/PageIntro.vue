<template>
	<div class="pageIntro">
		<div :class="['left', aligned ? 'aligned': '']">
			<div class="definition">
				<h4 v-t="'Definition'" v-if="definition" ref="definition"></h4>
				<p class="emphasedText" v-html="intro['Text']" ref="emphasedText"></p>
			</div>
			<p v-html="intro['Long text']" ref="longText"></p>
		</div>
		<div class="right" v-if="intro['Image']" ref="image">
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
		},
		aligned: {
			default: false
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
			this.checkDisplay();
		},
		'$store.getters.viewportSize': function() {
			this.checkDisplay();
		}
	},
	mounted() {
		this.tl = new TimelineMax({ paused: true });
		const duration = 0.7;
		let first = true;
		if (this.$refs.definition) {
			this.tl
			.fromTo(this.$refs.definition, duration, {
				opacity: 0,
				y: 20
			}, {
				opacity: 1,
				y: 0,
				ease: Power4.easeOut
			});
			first = false;
		}
		if (this.$refs.emphasedText) {
			const position = first ? 0 : duration / 2;
			this.tl
			.fromTo(this.$refs.emphasedText, duration, {
				opacity: 0,
				y: 80
			}, {
				opacity: 1,
				y: 0,
				ease: Power4.easeOut
			}, position);
			first = false;
		}
		if (this.$refs.longText) {
			const position = first ? 0 : duration / 2;
			this.tl
			.fromTo(this.$refs.longText, duration, {
				opacity: 0,
				y: 20
			}, {
				opacity: 1,
				y: 0,
				ease: Power4.easeOut
			}, position);
			first = false;
		}
		if (this.$refs.image) {
			const position = first ? 0 : duration / 2;
			this.tl
			.fromTo(this.$refs.image, duration, {
				opacity: 0,
				y: 20
			}, {
				opacity: 1,
				y: 0,
				ease: Power4.easeOut
			}, position);
			first = false;
		}
		this.checkDisplay();
	},
	methods: {
		checkDisplay() {
			if (!this.displayed) {
				const rect = this.$el.getBoundingClientRect();
				if (rect.top < this.$store.getters.viewportSize.height) {
					if (this.$store.getters.scrollPosition.y < this.$store.getters.viewportSize.height) {
						setTimeout(() => {
							this.show();
						}, 1000);
					} else {
						this.show();
					}
					this.displayed = true;
				}
			}
		},
		show() {
			this.tl.play();
		}
	}
};
</script>
<style lang="scss">
.pageIntro {
	display: flex;
	width: 100%;
	padding: 2rem var(--spacing-horizontal-large) var(--spacing-horizontal);
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
		padding-right: var(--spacing-horizontal);
		p, h4 {
			opacity: 0;
			display: block;
		}
		.emphasedText {
			max-width: 80%;
		}
		&.aligned{
			width: 100%;
			display: flex;
			margin-top: 2rem;
			justify-content: space-between;
			padding: 0;
			.definition {
				width: 40%;
				flex-grow: 0;
				flex-shrink: 0;
			}
			.emphasedText {
				max-width: none;
				margin-top: 0;
			}
			p:not(.emphasedText) {
				width: 50%;
				flex-grow: 0;
				flex-shrink: 0;
			}
		}
	}
	.right {
		width: 40%;
		opacity: 0;
	}
	img, video {
		width: 80%;
		border-radius: 1rem;
		object-fit: cover;
	}
}
</style>
