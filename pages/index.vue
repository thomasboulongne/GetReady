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
					img: '/images/ennis.png',
					color: '#FF6F5A'
				},
				{
					title: 'Relax',
					subtitle: 'like Kyrie Irving',
					img: '/images/irving.png',
					color: '#809DF7'
				},
				{
					title: 'Visualize',
					subtitle: 'like Wayne Rooney',
					img: '/images/rooney.png',
					color: '#60b247'
				},
				{
					title: 'Have a goal',
					subtitle: 'like Michael Phelps',
					img: '/images/phelps.png',
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
