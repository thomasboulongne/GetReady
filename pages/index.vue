<template>
	<div v-show="isPage">
		<section :class="['page', 'container']" :style="{'--lineScale': lineScale}">
			<component :is="component" :content="page.page" v-if="isPage && page"></component>
		</section>
		<footer>
			<div class="summaryCards">
				<div class="coloredBackground">
				</div>
				<nuxt-link :to="'/' + $t('my-cards')">
					<summary-card-indicator-comp></summary-card-indicator-comp>
				</nuxt-link>
			</div>
			<div class="footerNavWrapper">
				<div class="coloredBackground"></div>
				<nav>
					<ul>
						<li class="menuItem">
							<nuxt-link :to="{name:'page', params: {slug: prevPage.slug}}" class="navTitleWrapper MTKnox">
								<div v-for="(letter, j) in prevPage.title" :key="letter + j" class="letterWrapper">
									<span class="letter">{{ letter }}</span>
								</div>
							</nuxt-link>
						</li>
						<li class="menuItem">
							<nuxt-link :to="{name:'index'}" class="navTitleWrapper MTKnox">
								<div v-for="(letter, j) in $t('Back to homepage')" :key="letter + j" class="letterWrapper">
									<span class="letter">{{ letter }}</span>
								</div>
							</nuxt-link>
						</li>
						<li class="menuItem">
							<nuxt-link :to="{name:'page', params: {slug: nextPage.slug}}" class="navTitleWrapper MTKnox">
								<div v-for="(letter, j) in nextPage.title" :key="letter + j" class="letterWrapper">
									<span class="letter">{{ letter }}</span>
								</div>
							</nuxt-link>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	</div>
</template>

<script>
// import CookiesServ from 'cookie';
import CookiesClient from 'js-cookie';
import OrganizeComp from '~/components/Organize';
import VisualizeComp from '~/components/Visualize';
import SummaryCardIndicatorComp from '~/components/SummaryCardIndicator';

export default {
	// fetch({ store, redirect, req }) {
	// 	let goal;
	// 	if (process.server && req.headers.cookie) {
	// 		goal = CookiesServ.parse(req.headers.cookie)['reachyourgoal_goal'];
	// 	} else {
	// 		goal = CookiesClient.get('reachyourgoal_goal');
	// 	}
	// 	if (goal) {
	// 		store.dispatch('setGoal', goal);
	// 	} else if (store.getters.goal === null) {
	// 		return redirect('/intro');
	// 	}
	// },
	created() {
		const goal = CookiesClient.get('reachyourgoal_goal');
		if (goal !== undefined) {
			this.$store.dispatch('setGoal', goal);
		}
		if (this.$store.getters.goal === null) {
			this.$router.push('/intro');
		}
		this.$store.dispatch('updateCurrentColor', this.page ? this.page.color : '#acbee4');
	},
	mounted() {
		this.$store.dispatch('pageIsMounted');
		TweenMax.to(this, 0.8, {
			lineScale: 1,
			ease: Power4.easeOut,
			delay: 1
		});
	},
	data() {
		return {
			isPage: this.$route.name === 'page',
			lineScale: 0
		};
	},
	computed: {
		page: function() {
			return this.$t('categories.items').find(cat => cat.slug === this.$route.params.slug);
		},
		pageIndex: function() {
			return this.$t('categories.items').findIndex(cat => cat.slug === this.$route.params.slug);
		},
		prevPage: function() {
			const index = this.pageIndex - 1 < 0 ? this.$t('categories.items').length - 1 : this.pageIndex - 1;
			return this.$t('categories.items')[index];
		},
		nextPage: function() {
			const index = this.pageIndex + 1 === this.$t('categories.items').length ? 0 : this.pageIndex + 1;
			return this.$t('categories.items')[index];
		},
		component: function() {
			switch (this.$t('categories.items').findIndex(cat => cat.slug === this.$route.params.slug)) {
				case 0:
					return OrganizeComp;
				case 2:
					return VisualizeComp;
			}
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('pageNotMounted');
		next();
	},
	beforeRouteUpdate(to, from, next) {
		this.$store.dispatch('pageNotMounted');
		next();
	},
	components: {
		SummaryCardIndicatorComp
	}
};

</script>

<style lang="scss">
.page {
	height: auto;
	background-color: white;
	--topOffset: 100vh;
	--paddingTop: calc(var(--topOffset) * 0.8);
	top: calc(var(--topOffset) * -1);
	margin-bottom: calc(var(--topOffset) * -1);
	position: relative;
	padding-top: var(--paddingTop);
	padding-bottom: var(--spacingHorizontal);
	&:before {
		content: '';
		position: absolute;
		top: calc(var(--paddingTop) - 11vh);
		height: 11vh;
		width: 1px;
		left: var(--spacingHorizontalLarge);
		display: block;
		background: #c1cbe0;
		background: var(--current-color);
		transform-origin: top;
		transform: scaleY(var(--lineScale));
	}
	p {
		line-height: 1.82;
	}
	h2 {
		text-transform: uppercase;
		color: var(--grey);
		font-weight: bold;
		display: block;
		margin-left: var(--spacingHorizontal);
		font-size: 2.6rem;
		span {
			display: block;
			&:last-child {
				font-size: 1.7em;
				line-height: 1.1;
			}
		}
	}
	h3 {
		font-size: 2.05rem;
		font-weight: bold;
		color: var(--current-color);
	}
	h4 {
		color: var(--current-color);
	}
	ol, li {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	b {
		font-weight: 600;
		font-style: italic;
	}
	a {
		color: black;
		font-style: italic;
		font-weight: 600;
	}
	.emphasedText {
		font-size: 1.77rem;
		color: var(--grey);
		font-family: 'Antonio';
		max-width: 30rem;
		font-weight: normal;
	}
	.illustration.withShadow {
		position: relative;
		img {
			width: 100%;
			display: block;
			position: relative;
			&.shadow {
				position: absolute;
				top: 50%;
				left: 50%;
				filter: grayscale(1) brightness(0);
				opacity: 0.08;
				transform: translate(-60%, -51%) scale(1.02);
			}
		}
	}
	.example {
		display: flex;
		margin-top: 2rem;
		max-width: 80%;
		.label {
			font-size: 0.72rem;
			text-transform: uppercase;
			font-weight: normal;
			line-height: 2.5;
			color: var(--textGrey);
			vertical-align: baseline;
			margin-right: 2rem;
		}
		.simple, li {
			font-style: italic;
			width: 70%;
			display: flex;
			.sentence {
				font-size: 0.9rem;
				vertical-align: top;
				position: relative;
				display: inline;
				span {
					position: relative;
				}
			}
		}
		.simple, .multiple li:first-child {
			.sentence {
				span {
					display: inline;
					background: linear-gradient(#ffffff, #ffffff 60%, var(--exempleBlue) 60.1%);
				}
			}
		}
		.multiple {
			li {
				--opacity: 1;
				font-size: 0.66rem;
				--circleSize: 1.9em;
				line-height: 1.8;
				&:before { // Number
					flex-shrink: 0;
					content: attr(data-count);
					border: solid var(--current-color) 1px;
					height: var(--circleSize);
					width: var(--circleSize);
					display: inline-block;
					border-radius: var(--circleSize);
					text-align: center;
					font-style: normal;
					font-weight: bold;
					color: var(--current-color);
					line-height: calc(var(--circleSize));
					margin-right: 1rem;
					background: white;
					position: relative;
					z-index: 1;
				}
				opacity: var(--opacity);
				&:first-child {
					opacity: 1;
					&:before {
						border: solid var(--current-color) 1px;
						background-color: var(--current-color);
						color: white;
					}
					&:after {
						opacity: var(--opacity);
					}
				}
				&:not(:last-child) {
					padding-bottom: 0.7rem;
					position: relative;
					&:after { // Line
						content: '';
						z-index: 0;
						width: 1px;
						height: calc(100% - 0.8em);
						background-color: var(--current-color);
						display: block;
						position: absolute;
						left: calc((var(--circleSize) / 2) + 1px);
						top: var(--circleSize);
					}
				}
			}
		}
	}
	.savedTooltip {
		color: var(--blue);
		font-style: italic;
		font-size: 0.72rem;
		opacity: 0;
		transition: opacity 0.2s;
		position: absolute;
		top: calc(100% + 1rem);
		left: 50%;
		transform: translateX(-50%);
		svg {
			height: 0.72rem;
			width: auto;
			margin-right: 0.5rem;
		}
		&.show {
			opacity: 1;
		}
	}
	.detailsWrapper {
		display: flex;
		font-size: 1.16rem;
		margin: 3rem 0 4rem;
		&:before {
			content: '';
			width: 2.5rem;
			flex-shrink: 0;
			height: 1px;
			background-color: var(--current-color);
			margin-right: 1.5rem;
			transform: translateY(0.7em)
		}
		.details {
			li {
				font-style: italic;
				font-weight: bold;
				&:not(:last-child) {
					margin-bottom: 1.5rem;
				}
			}
		}
	}
}
footer {
	position: relative;
	margin-top: 4rem;
	.summaryCards {
		position: relative;
		height: 11.2rem;
		margin-bottom: -2.7rem;
		.summaryCardIndicator {
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 1.5rem;
		}
	}
	.footerNavWrapper {
		position: relative;
		padding: 10rem 0;
		.coloredBackground {
			background-color: var(--current-color);
		}
		nav {
			position: relative;
			z-index: 1;
			--menuLetterTransitionSpeed: 0.5s;
			ul {
				width: 100%;
				display: flex;
				justify-content: space-between;
				list-style-type: none;
				margin: 0;
				padding: 0;
				.menuItem {
					width: 33%;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					.navTitleWrapper {
						font-weight: bold;
						font-size: 2rem;
						color: white;
						cursor: pointer;
						position: relative;
						display: flex;
						&:hover {
							.letterWrapper {
								opacity: 1;
							}
						}
						.letterWrapper {
							text-transform: uppercase;
							display: inline-block;
							backface-visibility: hidden;
							transform: translateY(20%);
						}
					}
					&:nth-child(1), &:nth-child(3) {
						.navTitleWrapper{
							--footerNavLineScale: 5.5vw;
							&:after, &:before {
								content: '';
								position: absolute;
								top: 50%;
								height: 0.1em;
								width: var(--footerNavLineScale);
								background: white;
								right: calc(100% + 2rem);
								transform-origin: right;
								transition: width 0.2s;
								transform: translateY(-50%);
							}
							&:after {
								width: 11vw;
								height: 1px;
								transform: translateY(-50%);
							}
							&:hover {
								--footerNavLineScale: 11vw;
							}
						}
					}
					&:nth-child(3) {
						.navTitleWrapper{
							&:after, &:before {
								right: auto;
								left: calc(100% + 2rem);
							}
						}
					}
					&:nth-child(2) {
						.navTitleWrapper:after {
							content: '';
							transition: all 0.4s var(--ease);
							position: absolute;
							top: 110%;
							height: 0.1em;
							width: 0;
							background: white;
							left: 50%;
							transform: translateX(-50%) rotate(-3deg);
						}
						.navTitleWrapper:hover {
							&:after {
								width: 93%;
								transform: translateX(-50%) rotate(-3deg);
							}
						}
					}
					a {
						color: white;
						font-family: 'Antonio';
						text-transform: uppercase;
						font-weight: 600;
						text-decoration: none;
					}
					@for $j from 1 to 30 {
						.letterWrapper:nth-child(#{$j}) {
							transition: transform var(--menuLetterTransitionSpeed) var(--ease) calc((#{$j} - 1) * 0.01s), opacity var(--menuLetterTransitionSpeed) var(--ease) calc((#{$j} - 1) * 0.02s);
							opacity: 0.65;
							transform: translateY(0);
						}
					}
				}
			}
		}
	}
}
</style>
