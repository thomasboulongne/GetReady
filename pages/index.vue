<template>
	<section :class="['container', 'home']">
		<page-comp ref="page" v-if="page"></page-comp>
	</section>
</template>

<script>
import PageComp from '~/components/Page';
import CookiesServ from 'cookie';
import CookiesClient from 'js-cookie';

export default {
	fetch({ store, redirect, req }) {
		let goal;
		if (process.server && req.headers.cookie) {
			goal = CookiesServ.parse(req.headers.cookie)['reachyourgoal_goal'];
		} else {
			goal = CookiesClient.get('reachyourgoal_goal');
		}
		if (goal) {
			store.dispatch('setGoal', goal);
		}
		if (store.getters.goal === null) {
			return redirect('/intro');
		}
	},
	// created() {
	// 	const goal = CookiesClient.get('reachyourgoal_goal');
	// 	if (goal) {
	// 		this.$store.dispatch('setGoal', goal);
	// 	}
	// 	if (this.$store.getters.goal === null) {
	// 		this.$router.push('/intro');
	// 	}
	// },
	data() {
		return {
			page: this.$route.name === 'page'
		};
	},

	components: {
		PageComp
	}
};

</script>

<style lang="scss">
.home {
	width: 100%;
}
</style>
