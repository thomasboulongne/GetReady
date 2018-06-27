<template>
	<section class="my-summary-cards">
		<div class="panel">
			<div class="content">
				<h2 ref="title">
					<span>Les fiches récapitulatives</span>
					<span>personnalisées</span>
				</h2>
				<p>
					Pour garder une trace de votre parcours personnalisé et pour commencer à travailler sur votre objectif, vous avez la possibilité de télécharger des fiches récapitulatives.
				</p>
				<div class="download__button" @click="() => {}">
					<button-comp :text="$t('Download')" ref="download__button"></button-comp>
				</div>
			</div>
		</div>
		<div class="viewer">
			<div class="toolbar">
				<svg width="19" height="18" viewBox="0 0 19 18">
					<path fill="#C1CBE0" fill-rule="evenodd" d="M0 0h12v18H0zM14 0h5v8h-5zM14 10h5v8h-5z"/>
				</svg>
				<svg width="19" height="18" viewBox="0 0 19 18">
					<path fill="#5D666D" fill-rule="evenodd" d="M0 0h5v8H0zM7 0h5v8H7zM14 0h5v8h-5zM0 10h5v8H0zM7 10h5v8H7zM14 10h5v8h-5z"/>
				</svg>
			</div>
			<div class="files">
				<div class="main">
					<img :src="PATH + '/summary-cards/A4-01.jpg'" alt="">
				</div>
				<div class="sidebar">
					<img :src="PATH + '/summary-cards/A4-02.jpg'" alt="">
					<img :src="PATH + '/summary-cards/A4-03.jpg'" alt="">
					<img :src="PATH + '/summary-cards/A4-04.jpg'" alt="">
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import ButtonComp from '~/components/Button';
export default {
	data() {
		return {
			PATH: process.env.PATH
		};
	},
	mounted() {
		this.$refs.title.classList.add('show');
		this.$refs.download__button.show = true;
	},
	components: {
		ButtonComp
	}
};
</script>
<style lang="scss">
#app {
	.my-summary-cards {
		height: 100vh;
		width: 100%;
		display: flex;
		align-items: stretch;
		.panel {
			width: 40%;
			height: 100%;
			display: flex;
			justify-content: center;
			.content {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: var(--spacing);
				box-sizing: border-box;
				max-width: 30rem;
				h2 {
					font-size: 1.6rem;
					margin: 0;
				}
				p {
					margin: var(--spacing) 0;
					line-height: 2.07;
				}
				.textWrapper {
					border: solid 1px black;
					color: black;
				}
			}
		}
		.viewer {
			background-color: var(--light-grey);
			width: 60%;
			box-sizing: border-box;
			padding: 5rem;
			padding-bottom: 0;
			display: flex;
			flex-direction: column;
			.toolbar {
				svg {
					height: 1.2rem;
					width: auto;
					&:first-child {
						margin-right: 1rem;
					}
				}
			}
			.files {
				margin: var(--spacing) 0;
				display: flex;
				.main {
					width: 66%;
					img {
						display: block;
						height: 100%;
						width: auto;
						box-shadow: 0 2px 25px 0 rgba(197, 197, 197, 0.3);
					}
				}
				.sidebar {
					width: 34%;
					overflow: hidden;
					padding: 0 2rem;
					flex-shrink: 0;
					align-items: flex-end;
					justify-content: flex-start;
					box-sizing: border-box;
					img {
						flex-grow: 0;
						flex-shrink: 0;
						display: block;
						width: 75%;
						margin-bottom: 2rem;
						box-shadow: 0 2px 25px 0 rgba(197, 197, 197, 0.3);
					}
				}
			}
		}
	}
}
</style>
