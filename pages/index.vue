<template>
	<section :class="['container', 'home', $store.getters.goal === null ? 'introLayout' : 'selectorLayout']">
		<intro-comp></intro-comp>
		<selector-comp :items="items"></selector-comp>
	</section>
</template>

<script>
import selectorComp from '~/components/Selector';
import introComp from '~/components/Intro';

export default {
	data() {
		return {
			items: [
				{
					title: this.$t('categories.item1.title'),
					img: require('~/assets/images/athletes/bolt.png'),
					color: '#ff6f5a',
					shadow: {
						x: 4,
						y: -3
					}
				},
				{
					title: this.$t('categories.item2.title'),
					img: require('~/assets/images/athletes/williams.png'),
					color: '#ff9f6c',
					shadow: {
						x: 6,
						y: -4
					}
				},
				{
					title: this.$t('categories.item3.title'),
					img: require('~/assets/images/athletes/phelps.png'),
					color: '#5781f8',
					shadow: {
						x: 6,
						y: 2
					}
				}
			]
		};
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
		transition: opacity var(--transitionDuration), visibility 0s linear var(--transitionDuration), transform var(--transitionDuration) var(--ease) 0s;
	}
	.selector {
		position: absolute;
		top: 0;
		left: 0;
		transition: opacity 0.4s var(--ease) calc(var(--transitionDuration) / 2), transform var(--transitionDuration) var(--ease);
	}
	&.introLayout {
		.selector {
			visibility: hidden;
			opacity: 0;
			transform: scale(0.97);
		}
	}
	&.selectorLayout {
		.intro {
			opacity: 0;
			transform: scale(0.97);
			visibility: hidden;
		}
	}
}
</style>
