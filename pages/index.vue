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
					title: 'Concentrate',
					subtitle: 'like <span class="bigger">Jessica Ennis</span>',
					img: 'https://i.imgur.com/S7fuWDW.png',
					color: '#FF6F5A',
					x: 2,
					y: -1
				},
				{
					title: 'Relax',
					subtitle: 'like <span class="bigger">Kyrie Irving</span>',
					img: 'https://i.imgur.com/xYXoTYa.png',
					color: 'crimson',
					x: 2,
					y: 1
				},
				{
					title: 'Have a goal',
					subtitle: 'like <span class="bigger">Michael Phelps</span>',
					img: 'https://i.imgur.com/4grZkDG.png',
					color: '#799cff',
					x: 3,
					y: 7
				},
				{
					title: 'Visualize',
					subtitle: 'like <span class="bigger">Wayne Rooney</span>',
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
