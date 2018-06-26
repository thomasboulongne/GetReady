<template>
	<div class="detailedBlocks">
		<div v-for="block in blocks" class="detailedBlock" :key="block['Title']">
			<div class="illustration">
				<img :src="PATH + block['Illustration']" alt="">
			</div>
			<div class="title">
				<span>{{ block['Title'].split('_')[0] }}</span>
				<span>{{ block['Title'].split('_')[1] }}</span>
			</div>
			<p v-html="block['Text']"></p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		blocks: {
			default: function() {
				return [];
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
.detailedBlocks {
	display: flex;
	width: 100%;
	max-width: 70rem;
	margin: auto;
	justify-content: space-between;
	align-items: flex-start;
	margin-top: 7rem;
	.detailedBlock {
		background-color: var(--light-grey);
		padding: 8rem 2.77rem 3.88rem;
		padding-top: 8rem;
		width: 46%;
		box-sizing: border-box;
		border-radius: 1em;
		box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.05);
		position: relative;
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
		.illustration {
			position: absolute;
			width: 25%;
			top: 0;
			right: 10%;
			transform: translateY(-50%);
			img {
				width: 100%;
			}
		}
		&:nth-child(1) {
			.illustration:after {
				content: '';
				position: absolute;
				top: 110%;
				height: 0.7rem;
				width: 80%;
				border-radius: 100%;
				background: rgba(0, 0, 0, 0.05);
				left: 50%;
				transform: translateX(-50%);
			}
		}
		&:nth-child(2){
			transform: translateY(-5rem);
			.illustration {
				width: 36%;
				perspective: 100rem;
				perspective-origin: bottom right;
				&:after {
					content: '';
					position: absolute;
					top: 110%;
					height: 2rem;
					width: 100%;
					background: rgba(0, 0, 0, 0.05);
					left: 50%;
					transform: translateX(-50%);
					--pathOffset: 20%;
					clip-path: polygon(0 var(--pathOffset), var(--pathOffset) 0, 100% calc(100% - var(--pathOffset)), calc(100% - var(--pathOffset)) 100%);
				}
			}
		}
	}
}
</style>
