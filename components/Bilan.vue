<template>
	<div class="bilan">
		<!-- BILAN 1 -->
		<img class="bilan-svg" :class="[current == 0 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/bilan01.png" />
		<!-- BILAN 2 -->
		<img class="bilan-svg" :class="[current == 1 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/bilan02.png" />
		<!-- BILAN 3 -->
		<img class="bilan-svg" :class="[current == 2 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/bilan03.png" />
	</div>
</template>
<script>
export default {
	props: {
		current: {
			default: function() {
				return 0;
			}
		}
	},

	data() {
		return {
		};
	},

	mounted() {
		console.log(this.current);
	}
};
</script>


<style lang="scss">
.bilan {

	overflow: hidden;
    background-color: white;
    position: absolute;
    top: 33.83%;
    transform: translateX(10.01%);
    width: 100%;

	.bilan-svg {
		width: 100%;
		height: auto;
		display:none;
	}

	.bilan-svg.active {
		display: initial;
	}
}
</style>
