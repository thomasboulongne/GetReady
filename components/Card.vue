<template>
	<div class="cardComp">
		<div class="illustration">
			<img :src="PATH + item.img" alt="" class="shadow">
			<img :src="PATH + item.img" alt="">
		</div>
		<h3>{{ item.title }}</h3>
		<p v-html="item.text"></p>
	</div>
</template>

<script>
export default {
	props: {
		item: {
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
.cardComp {
	width: var(--cardWidth);
	height: calc(var(--cardWidth) * 1.54);
	background: white;
	color: var(--black);
	border-radius: calc(var(--cardWidth) / 15);
	--cardRotate: 0deg;
	padding: calc(var(--cardWidth) * 0.1);
	box-sizing: border-box;
	text-align: center;
	opacity: 1;
	--cardBoxShadowOpacity: 0;
	box-shadow: 0 calc(var(--cardWidth) * 0.03) calc(var(--cardWidth) * 0.07) rgba(0, 0, 0, var(--cardBoxShadowOpacity));
	font-size: calc(var(--cardWidth) * 0.06);
	.illustration {
		position: relative;
		width: 66%;
		height: 7.5em;
		margin: auto;
		pointer-events: none;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			position: relative;
			&.shadow {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-55%, -35%);
				filter: brightness(0);
				opacity: 0.05;
			}
		}
	}
	h3 {
		margin-top: 1.2em;
		margin-bottom: 0.6em;
		font-size: 1.6em !important;
		color: var(--blue) !important;
		text-transform: uppercase;
	}
	p {
		margin: 0;
		font-weight: 300;
		font-size: 0.8em !important;
	}
}

</style>
