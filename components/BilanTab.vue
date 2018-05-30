<template>
	<div class="bilantab">
		<!-- BILAN 1 -->
		<img class="bilantab-svg" :class="[current == 0 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/tab01.png" />
		<!-- BILAN 2 -->
		<img class="bilantab-svg" :class="[current == 1 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/tab02.png" />
		<!-- BILAN 3 -->
		<img class="bilantab-svg" :class="[current == 2 ? 'active' : '' ]" src="http://imagehost.kevinmoutier.com/images/2018/05/29/tab03.png
" />
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
.bilantab {

	overflow: hidden;
    background-color: white;
    position: absolute;
    top: 38.645%;
    width: 100%;

	.bilantab-svg {
		width: 100%;
		height: auto;
		display:none;
	}

	.bilantab-svg.active {
		display: initial;
	}
}
</style>
