<template>
	<div class="mainQuote">
		<div class="coloredBackground"></div>
		<div class="content">
			<div class="illustration withShadow">
				<img class="shadow" :src="PATH + quote['Image']" alt="">
				<img :src="PATH + quote['Image']" alt="">
			</div>
			<div class="text">
				<svg width="40" height="32" viewBox="0 0 40 32">
					<g fill="#FF7056" fill-rule="nonzero">
						<path d="M27.895 17.404c.854.255 1.709.384 2.54.384a7.752 7.752 0 0 0 3.186-.676c-.801 3.035-2.725 8.272-6.557 8.862a.922.922 0 0 0-.742.678l-.838 3.1a.97.97 0 0 0 .116.771c.145.228.377.38.637.417.283.04.571.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C35.294 2.3 33.025 1.12 30.105 1h-.035c-3.603 0-6.797 2.512-7.77 6.108a8.561 8.561 0 0 0 .74 6.35 8.145 8.145 0 0 0 4.854 3.946zM2.042 13.457a8.144 8.144 0 0 0 4.853 3.947c.854.255 1.709.384 2.54.384a7.754 7.754 0 0 0 3.186-.675c-.8 3.034-2.724 8.271-6.557 8.86a.922.922 0 0 0-.742.679l-.838 3.1a.97.97 0 0 0 .116.771c.144.228.376.38.637.417.282.04.57.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C14.294 2.3 12.025 1.118 9.105 1H9.07C5.468 1 2.273 3.512 1.301 7.108a8.566 8.566 0 0 0 .74 6.35z"/>
					</g>
				</svg>
				<div class="quote" v-html="quote['Quote']"></div>
				<div class="athlete">
					<span class="name" v-html="quote['Athlete']"></span>
					<span class="description" v-html="quote['Athlete description']"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		quote: {
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			PATH: process.env.PATH
		};
	}
};
</script>
<style lang="scss">
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
					fill: var(--current-color);
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
					color: var(--current-color);
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
</style>
