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
					title: 'Be positive',
					subtitle: 'like Jessica Ennis',
					img: 'https://imgur.com/S7fuWDW',
					color: '#FF6F5A'
				},
				{
					title: 'Relax',
					subtitle: 'like Kyrie Irving',
					img: 'https://imgur.com/xYXoTYa',
					color: '#809DF7'
				},
				{
					title: 'Visualize',
					subtitle: 'like Wayne Rooney',
					img: 'https://imgur.com/5tFRnka',
					color: '#60b247'
				},
				{
					title: 'Have a goal',
					subtitle: 'like Michael Phelps',
					img: 'https://imgur.com/4grZkDG',
					color: 'crimson'
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
