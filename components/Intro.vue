<template>
	<div class="intro">
		<div class="sentences">
			<div class="sentence" v-for="i in 3" :key="i">
				<span v-for="(word, j) in $t('sentences.' + i).split(' ')" :key="j">{{ word }} </span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	i18n: {
		messages: {
			en: {
				sentences: {
					1: 'Nous avons tous un objectif à atteindre.',
					2: 'Qu\'il soit sportif, personnel ou encore professionnel...',
					3: 'Et vous, quel est le votre ?'
				}
			},
			fr: {
				sentences: {
					1: 'Nous avons tous un objectif à atteindre.',
					2: 'Qu\'il soit sportif, personnel ou encore professionnel...',
					3: 'Et vous, quel est le votre ?'
				}
			}
		}
	},
	data() {
		return {
		};
	}
};
</script>


<style lang="scss">
.intro {
}
</style>
