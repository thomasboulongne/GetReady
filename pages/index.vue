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
					img: 'https://i.imgur.com/S7fuWDW.png',
					color: '#ff6f5a',
					x: 2,
					y: -1
				},
				{
					title: this.$t('categories.item2.title'),
					img: 'https://i.imgur.com/4grZkDG.png',
					color: '#ffbe92',
					x: 3,
					y: 7
				},
				{
					title: this.$t('categories.item3.title'),
					img: 'https://i.imgur.com/5tFRnka.png',
					color: '#05175d',
					x: 2,
					y: 1
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
