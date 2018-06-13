<template>
	<section :class="['container', 'home', $route.name === 'intro' ? 'introLayout' : 'selectorLayout']">
		<intro-comp ref="intro" v-if="intro" :lastColor="items[items.length - 2].color"></intro-comp>
		<selector-comp ref="selector" :items="items" v-if="selector"></selector-comp>
		<page-comp ref="page" v-if="page"></page-comp>
	</section>
</template>

<script>
import selectorComp from '~/components/Selector';
import introComp from '~/components/Intro';
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
			items: this.$t('categories').items,
			intro: this.$route.name === 'intro',
			selector: this.$route.name === 'index',
			page: this.$route.name === 'page'
		};
	},

	beforeRouteLeave(to, from, next) {
		if (from.name === 'intro' && to.name === 'index') {
			this.selector = true;
			const fadeDuration = 0.6;
			this.$nextTick(() => {
				const tl = new TimelineMax({
					paused: true,
					onComplete: () => {
						this.intro = false;
					}
				});
				tl
				.to(this.$refs.intro.$el, 0.4, {
					'--maskYRight': 0
				})
				.to(this.$refs.intro.$el, 0.6, {
					'--maskYLeft': 0
				}, 0)
				.to(this.$refs.intro.$el, fadeDuration, {
					opacity: 0
				})
				.add(() => {
					this.$refs.selector.spinAnimation()
					.then(next);
				}, '-=' + fadeDuration);
				tl.play();
			});
		} else {
			next();
		}
	},

	components: {
		introComp,
		selectorComp,
		PageComp
	}
};

</script>

<style lang="scss">
.home {
	--transitionDuration: 1.5s;
	background: var(--lightOrange);
	height: 100vh;
	width: 100%;
	.intro {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
	}
	.selector {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
