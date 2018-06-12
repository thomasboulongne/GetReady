<template>
	<section :class="['container', 'home', $route.name === 'intro' ? 'introLayout' : 'selectorLayout']">
		<intro-comp ref="intro" v-if="intro" :lastColor="items[items.length - 2].color"></intro-comp>
		<selector-comp ref="selector" :items="items" v-if="selector"></selector-comp>
	</section>
</template>

<script>
import selectorComp from '~/components/Selector';
import introComp from '~/components/Intro';

export default {
	fetch({ store, redirect }) {
		if (store.getters.goal === null) {
			return redirect('/intro');
		}
	},
	// created() {
	// 	if (this.$store.getters.goal === null) {
	// 		this.$router.push('/intro');
	// 	}
	// },
	data() {
		return {
			items: [
				{
					title: this.$t('categories.item1.title'),
					athlete: this.$t('categories.item1.athlete'),
					img: require('~/assets/images/athletes/bolt.png'),
					color: '#fd6246',
					position: {
						x: 1.4,
						y: 0
					},
					shadow: {
						x: 0.7,
						y: 0
					}
				},
				{
					title: this.$t('categories.item2.title'),
					athlete: this.$t('categories.item2.athlete'),
					img: require('~/assets/images/athletes/williams.png'),
					color: '#ff8b49',
					position: {
						x: -3.3,
						y: 0
					},
					shadow: {
						x: -4,
						y: -0.2
					}
				},
				{
					title: this.$t('categories.item3.title'),
					athlete: this.$t('categories.item3.athlete'),
					img: require('~/assets/images/athletes/phelps.png'),
					color: '#4b80ff',
					position: {
						x: 1.5,
						y: 0
					},
					shadow: {
						x: 1,
						y: -0.3
					}
				}
			],
			intro: this.$route.name === 'intro',
			selector: this.$route.name === 'index'
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
		selectorComp
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
