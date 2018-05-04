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
					subtitle: 'like Serena Williams',
					img: '/images/serena.png',
					color: '#FF6F5A'
				},
				{
					title: 'Be positive',
					subtitle: 'like Serena Williams',
					img: '/images/serena.png',
					color: '#809DF7'
				},
				{
					title: 'Be positive',
					subtitle: 'like Serena Williams',
					img: '/images/serena.png',
					color: '#60b247'
				},
				{
					title: 'Be positive',
					subtitle: 'like Serena Williams',
					img: '/images/serena.png',
					color: 'crimson'
				},
				{
					title: 'Be positive',
					subtitle: 'like Serena Williams',
					img: '/images/serena.png',
					color: 'azure'
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
.container {
}
</style>
