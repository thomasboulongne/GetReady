<template>
	<div class="methods">
		<!-- BILAN 1 -->
		<img class="methods-svg" :class="[current == 0 ? 'active' : '' ]" src="~/assets/images/organize/methode01.png" />
		<!-- BILAN 2 -->
		<img class="methods-svg" :class="[current == 1 ? 'active' : '' ]" src="~/assets/images/organize/methode02.png" />
		<!-- BILAN 3 -->
		<img class="methods-svg" :class="[current == 2 ? 'active' : '' ]" src="~/assets/images/organize/methode03.png" />
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
