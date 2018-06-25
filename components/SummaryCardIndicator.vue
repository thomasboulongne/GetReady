<template>
	<div :class="['summaryCardIndicator']">
		<img class="rotation" :src="PATH + $t('SummaryCardIndicator')" alt="">
		<img class="eye" :src="PATH + '/images/eye.svg'" alt="">
	</div>
</template>

<script>
export default {
	data() {
		return {
			PATH: process.env.PATH
		};
	}
};
</script>

<style lang="scss">
.summaryCardIndicator {
	width: 12rem;
	position: relative;
	.rotation {
		animation: rotation infinite 12s linear;
		margin: 0;
	}
	.eye {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 10% !important;
	}
	@keyframes rotation {
		from {
			transform: rotateZ(0deg);
		}
		to {
			transform: rotateZ(360deg);
		}
	}
}
</style>
