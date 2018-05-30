<template>
	<div class="planning">
		<!-- BILAN 1 -->
		<img class="planning-svg" :class="[current == 0 ? 'active' : '' ]" src="~/assets/images/organize/planifier01.png" />
		<!-- BILAN 2 -->
		<img class="planning-svg" :class="[current == 1 ? 'active' : '' ]" src="~/assets/images/organize/planifier02.png" />
		<!-- BILAN 3 -->
		<img class="planning-svg" :class="[current == 2 ? 'active' : '' ]" src="~/assets/images/organize/planifier03.png" />
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
.planning {

	overflow: hidden;
    background-color: white;
    position: absolute;
    top: 48.75%;
    width:100%;
    transform: translateX(10.2%);

	.planning-svg {
		width: 100%;
		height: auto;
		display:none;
	}

	.planning-svg.active {
		display: initial;
	}
}
</style>
