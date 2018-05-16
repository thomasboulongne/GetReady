<template>
	<section class="container">
		<menu-comp :items="items"></menu-comp>
	</section>
</template>

<script>
import Menu from '~/components/Menu';

// import { getAll } from '~/core/Contentful';

export default {

	// async fetch({store, isServer, req, res}) {
	// 	await getAll(store, isServer, req, res);
	// },

	data() {
		return {
			items: [
				{
					title: 'Be positive',
					subtitle: 'like Jessica Ennis',
					img: 'https://i.imgur.com/S7fuWDW.png',
					color: '#FF6F5A',
					x: 2,
					y: -1
				},
				{
					title: 'Relax',
					subtitle: 'like Kyrie Irving',
					img: 'https://i.imgur.com/xYXoTYa.png',
					color: 'crimson',
					x: 2,
					y: 1
				},
				{
					title: 'Have a goal',
					subtitle: 'like Michael Phelps',
					img: 'https://i.imgur.com/4grZkDG.png',
					color: '#799cff',
					x: 5,
					y: 10
				},
				{
					title: 'Visualize',
					subtitle: 'like Wayne Rooney',
					img: 'https://i.imgur.com/5tFRnka.png',
					color: '#60b247',
					x: 2,
					y: 1
				}
			]
		};
	},

	components: {
		'menu-comp': Menu
	}
};

</script>

<style lang="scss">
@import '~assets/scss/variables.scss';
</style>
