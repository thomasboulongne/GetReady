<template>
	<section class="container">
		<example-comp></example-comp>
	</section>
</template>

<script>
import Example from '~components/Example';

import { getAll } from '~core/Contentful';

export default {

	async fetch({store, isServer, req, res}) {
		await getAll(store, isServer, req, res);
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
