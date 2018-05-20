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
					title: 'Concentrate',
					subtitle: 'like <span class="bigger">Jessica Ennis</span>',
					img: 'https://i.imgur.com/S7fuWDW.png',
					color: '#ff6f5a',
					x: 2,
					y: -1
				},
				{
					title: 'Have a goal',
					subtitle: 'like <span class="bigger">Michael Phelps</span>',
					img: 'https://i.imgur.com/4grZkDG.png',
					color: '#ffbe92',
					x: 3,
					y: 7
				},
				{
					title: 'Visualize',
					subtitle: 'like <span class="bigger">Wayne Rooney</span>',
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
@import '~assets/scss/variables.scss';
</style>
