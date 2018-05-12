<template>
	<section class="container">
		<example-comp></example-comp>
	</section>
</template>

<script>
import Example from '~/components/Example';

// import { getAll } from '~/core/Contentful';

export default {

	// async fetch({store, isServer, req, res}) {
	// 	await getAll(store, isServer, req, res);
	// },

	head() {
		return {
			title: 'Page - Spill.net',
			meta: [
				{ hid: 'description', name: 'description', content: 'Page' },
				{ hid: 'og:title', name: 'og:title', content: 'Page — Spill.net' },
				{ hid: 'og:description', name: 'og:description', content: 'Page' }
			]
		};
	},

	computed: {
		// page: function() {
		// 	return this.$store.getters.page(this.$route.params.query);
		// }
	},

	components: {
		'example-comp': Example
	}
};

</script>

<style lang="scss">
@import '~assets/scss/variables.scss';

.container
{
}
</style>
