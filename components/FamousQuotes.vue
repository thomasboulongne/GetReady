<template>
	<div class="famousQuotes">
		<div class="coloredBackground"></div>
		<div class="content">
			<h2>
				<span v-html="$t('These celebrities approve').split('_')[0]"></span>
				<span v-html="$t('These celebrities approve').split('_')[1]"></span>
			</h2>
			<slider-comp :items="quotes" :componentType="'CelebrityComp'"></slider-comp>
		</div>
	</div>
</template>
<script>
import SliderComp from '~/components/Slider';
export default {
	props: {
		quotes: {
			default: function() {
				return [];
			}
		}
	},
	components: {
		SliderComp
	}
};
</script>
<style lang="scss">
.famousQuotes {
	position: relative;
	padding-bottom: 8rem;
	h2 {
		position: relative;
		z-index: 1;
		margin-bottom: 0;
		max-width: none;
		margin-left: var(--spacing-horizontal);
	}
	.coloredBackground {
		top: 1.9rem;
		clip-path: polygon(0 0%, 100% 0%, 100% 85%, 0% 100%);
	}
	.slider {
		overflow: hidden;
		.items {
			margin-top: 1rem;
			--celebrityWidth: 39rem;
			position: relative;
			left: calc(50% - var(--celebrityWidth) / 2);
		}
		.sliderIndicator {
			margin-left: var(--spacing-horizontal);
			width: 25%;
		}
	}
}
</style>
