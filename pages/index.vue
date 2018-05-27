<template>
	<section class="container">
		<selector-comp :items="items"></selector-comp>
	</section>
</template>

<script>
import Selector from '~/components/Selector';

// import { getAll } from '~/core/Contentful';

export default {

	// async fetch({store, isServer, req, res}) {
	// 	await getAll(store, isServer, req, res);
	// },

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
		'selector-comp': Selector
	}
};

</script>

<style lang="scss">
</style>
