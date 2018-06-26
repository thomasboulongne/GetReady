<template>
	<div class="celebrityComp">
		<div class="illustration withShadow">
			<img :src="PATH + item.Image" alt="" class="shadow">
			<img :src="PATH + item.Image" alt="">
		</div>
		<div class="content">
			<h3>{{ item.Name }}</h3>
			<span class="description" v-html="item.Description"></span>
			<p v-html="item.Text"></p>
		</div>
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
.celebrityComp {
	width: var(--celebrityWidth);
	display: flex;
	align-items: stretch;
	position: relative;
	--celebrityPaddingRight: calc(var(--celebrityWidth) * 0.3);
	padding-right: var(--celebrityPaddingRight);
	&:not(:last-child) {
		margin-right: calc(var(--celebrityWidth) / 7.8);
	}
	.illustration {
		position: relative;
		z-index: 1;
		img {
			height: 30rem;
			width: auto !important;
			pointer-events: none;
		}
	}
	.content {
		margin-top: calc(var(--celebrityWidth) / 7.8);
		margin-left: calc(var(--celebrityWidth) / 19.5);
		margin-bottom: calc(var(--celebrityWidth) / 7.8);
		position: relative;
		h3 {
			position: relative;
			text-transform: none;
			margin-bottom: calc(var(--celebrityWidth) / 78);
		}
		.description {
			position: relative;
			font-size: calc(var(--celebrityWidth) / 50.64);
			font-style: italic;
			display: inline-block;
			color: var(--medium-grey);
			max-width: 66%;
		}
		p {
			position: relative;
			font-size: calc(var(--celebrityWidth) / 47);
		}
		&:before {
			content: '';
			position: absolute;
			background: white;
			height: 110%;
			width: calc(150% + 2 * var(--spacing));
			right: calc(var(--spacing) * -1);
			border-radius: calc(var(--celebrityWidth) / 19.5);
			transform: skew(-2deg) rotate(-2deg);
		}
	}
}

</style>
