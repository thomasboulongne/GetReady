<template>
	<section :class="['page']">
	</section>
</template>

<script>
export default {
	computed: {
		page: function() {
			return this.$t('categories.items[0]');
		}
	}
};
</script>

<style lang="scss">
.page {
	height: auto;
	background-color: white;
	.header {
		position: relative;
		width: 100%;
		height: calc(var(--vh) / 2);
	}
}
</style>
