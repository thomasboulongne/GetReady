<template>
	<section :class="['page']" :style="{ '--currentColor': page.color }">
		<div class="pageIntro">
			<div class="definition">
				<h4 v-t="'Definition'"></h4>
				<p class="emphasedText">Un objectif est un résultat spécifique que l'on décide d'atteindre dans un temps donné.</p>
			</div>
			<p>La réalisation d'un objectif complexe, ou à long terme, peut nécessiter la mise en place d'étapes, ou objectifs intermédiaires. On évoque par exemple :</p>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<img src="/images/trophy.png" alt="">
					</div>
					<div class="title">
						<span>L'objectif</span>
						<span>principal</span>
					</div>
					<p>C’est le but à atteindre à long terme. Remporter une place lors d’une compétition, terminer un marathon, obtenir son bac ou se maintenir en bonne santé peuvent être des objectifs principaux. C’est en réfléchissant à l’atteinte de ses objectifs que l’on peut planifier ses sous-objectifs.</p>
				</div>
				<div class="block">
					<div class="illustration">
						<img src="/images/steps.png" alt="">
					</div>
					<div class="title">
						<span>Les sous</span>
						<span>objectifs</span>
					</div>
					<p>Ce sont les étapes ou les moyens mis en oeuvre pour atteindre son objectif principal. Ils permettent de progresser efficacement tout en renforçant sa motivation à chaque réussite.</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	computed: {
		page: function() {
			return this.$t('categories.items[0]');
		}
	}
};
</script>

<style lang="scss">
.page {
	height: auto;
	background-color: white;
	top: -38vh;
	position: relative;
	padding-top: 20vh;
	h4 {
		color: var(--currentColor);
	}
	&::before {
		content: '';
		position: absolute;
		top: 0;
		height: 20vh;
		width: 1px;
		left: var(--spacingHorizontalLarge);
		display: block;
		background: #c1cbe0;
	}
	.emphasedText {
		font-size: 1.77rem;
		color: var(--grey);
		font-family: 'Antonio';
		max-width: 30rem;
		font-weight: normal;
	}
	.pageIntro {
		margin: 0 var(--spacingHorizontalLarge);
		.definition {
		}
		p {
			max-width: 30rem;
		}
		.blocks {
			display: flex;
			width: 100%;
			justify-content: space-between;
			.block {
				background-color: var(--lightGrey);
				padding: 1.5em;
				width: 48%;
				box-sizing: border-box;
				border-radius: 1em;
				box-shadow: 0 0.4em 0.4em rgba(0, 0, 0, 0.05);
				.title {
					font-family: 'Antonio';
					color: var(--grey);
					text-transform: uppercase;
					font-size: 1.77rem;
					font-weight: bold;
					line-height: 1.2;
					span:last-child {
						display: block;
						font-size: 1.59em;
					}
				}
				p {
					width: 100%;
				}
			}
		}
	}
}
</style>
