<template>
	<section :class="['page']">
		<big-title-comp></big-title-comp>
	</section>
</template>

<script>
import BigTitleComp from '~/components/BigTitle';
export default {
	components: {
		BigTitleComp
	}
};
</script>

<style lang="scss">
.page {
	.titleWrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
