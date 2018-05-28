<template>
	<section class="container">
		<intro-comp></intro-comp>
		<!-- <selector-comp :items="items"></selector-comp> -->
	</section>
</template>

<script>
import selectorComp from '~/components/Selector';
import introComp from '~/components/Intro';

export default {
	data() {
		return {
			items: [
				{
					title: this.$t('categories.item1.title'),
					img: 'https://i.imgur.com/S7fuWDW.png',
					color: '#ff6f5a',
					x: 2,
					y: -1
				},
				{
					title: this.$t('categories.item2.title'),
					img: 'https://i.imgur.com/4grZkDG.png',
					color: '#ffbe92',
					x: 3,
					y: 7
				},
				{
					title: this.$t('categories.item3.title'),
					img: 'https://i.imgur.com/5tFRnka.png',
					color: '#05175d',
					x: 2,
					y: 1
				}
			]
		};
	},

	components: {
		introComp,
		selectorComp
	}
};

</script>

<style lang="scss">
</style>
