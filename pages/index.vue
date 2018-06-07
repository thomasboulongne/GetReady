<template>
	<section :class="['container', 'home', $route.name === 'intro' ? 'introLayout' : 'selectorLayout']">
		<intro-comp ref="intro" v-if="intro"></intro-comp>
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
					shadow: {
						x: 4,
						y: -3
					}
				},
				{
					title: this.$t('categories.item2.title'),
					athlete: this.$t('categories.item2.athlete'),
					img: require('~/assets/images/athletes/williams.png'),
					color: '#ff8b49',
					shadow: {
						x: 6,
						y: -4
					}
				},
				{
					title: this.$t('categories.item3.title'),
					athlete: this.$t('categories.item3.athlete'),
					img: require('~/assets/images/athletes/phelps.png'),
					color: '#4b80ff',
					shadow: {
						x: 6,
						y: 2
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
			this.$nextTick(() => {
				const tl = new TimelineMax({
					paused: true,
					onComplete: () => {
						this.intro = false;
					}
				});
				tl.to(this.$refs.intro.$el, 1, {
					opacity: 0
				})
				.add(() => {
					this.$refs.selector.spinAnimation()
					.then(next);
				}, 0);
				tl.play();
			});
		} else {
			console.log('hello');
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
		z-index: 2;
	}
	.selector {
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
