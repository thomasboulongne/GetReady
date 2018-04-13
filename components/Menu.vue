<template>
	<div class="menu">
		<ul>
			<li v-for="item in items" :key="item.color" class="item" :style="{'--color': item.color}">
				<div class="imgWrapper">
					<img :src="item.img" alt="">
				</div>
				<div class="letterWrapper" v-html="'<div><span>' + item.title.replace(' ', ' ').split('').join('</span></div><div><span>') + '</span></div>'"></div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		items: {
			default: function() {
				return [];
			}
		}
	},

	mounted() {
		console.log(this.items[0].title);
	}
};
</script>


<style lang="scss">
@import '~assets/scss/variables.scss';

.menu {
	.item {
		position: relative;
		background: var(--color);
		width: 100vw;
		height: 100vh;
		display: inline-block;
		.imgWrapper {
			img {
				position: absolute;
				width: 50vw;
				max-height: 80vh;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				filter: grayscale(1);
			}
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		.letterWrapper {
			font-family: 'Oswald';
			color: white;
			font-size: 10rem;
			text-transform: uppercase;
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 7%;
			top: 0;
			left: 0;
			div {
				display: inline-block;
				position: relative;
				@for $i from 1 to 100 {
					&:nth-child(#{$i}) {
						z-index: random($limit: 3) - 1;
						span {
							display: inline-block;
							transform: translateY((random($limit: 20%) - 10%));
						}
					}
				}
			}
		}
	}
}

</style>
