<template>
	<div class="methods">
		<!-- BILAN 1 -->
		<img class="methods-svg" :class="[current == 0 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/methode01.png" />
		<!-- BILAN 2 -->
		<img class="methods-svg" :class="[current == 1 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/methode02.png" />
		<!-- BILAN 3 -->
		<img class="methods-svg" :class="[current == 2 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/methode03.png" />
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
	}
};
</script>


<style lang="scss">
.methods {

	overflow: hidden;
    background-color: white;
    position: absolute;
    top: 54.8%;
    width: 100%;
    transform: translateX(10.99%);

	.methods-svg {
		width: 100%;
		height: auto;
		display:none;
	}

	.methods-svg.active {
		display: initial;
	}
}
</style>
