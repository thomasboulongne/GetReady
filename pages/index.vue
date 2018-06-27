<template>
	<section v-show="isPage" :class="['page', 'container']" :style="{'--lineScale': lineScale}">
		<component :is="component" :content="page.page" v-if="isPage && page"></component>
	</section>
</template>

<script>
// import CookiesServ from 'cookie';
import CookiesClient from 'js-cookie';
import OrganizeComp from '~/components/Organize';
import VisualizeComp from '~/components/Visualize';

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
	data() {
		return {
			isPage: this.$route.name === 'page',
			lineScale: 0
		};
	},
	watch: {
		'$store.getters.scrollPosition.y': function() {
			this.showTitles();
		}
	},
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
		this.showTitles();
	},
	computed: {
		page: function() {
			return this.$t('categories.items').find(cat => cat.slug === this.$route.params.slug);
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
	methods: {
		showTitles() {
			const titles = Array.from(this.$el.querySelectorAll('h2:not(.show)'));
			titles.forEach(title => {
				if (title.getBoundingClientRect().top < this.$store.getters.viewportSize.height * 0.9) {
					title.classList.add('show');
				}
			});
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('pageNotMounted');
		next();
	},
	beforeRouteUpdate(to, from, next) {
		this.$store.dispatch('pageNotMounted');
		next();
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
	padding-bottom: var(--spacing-horizontal);
	&:before {
		content: '';
		position: absolute;
		top: calc(var(--paddingTop) - 13vh);
		height: 13vh;
		width: 1px;
		left: calc(50% - 45rem + var(--spacing-horizontal-large));
		display: block;
		background: #c1cbe0;
		background: var(--current-color);
		transform-origin: top;
		transform: scaleY(var(--lineScale));
	}
	p {
		line-height: 1.82;
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
			color: var(--text-grey);
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
					background: linear-gradient(#ffffff, #ffffff 60%, var(--exemple-blue) 60.1%);
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

	--player-button-width: 3rem;
	.player {
		.play {
			cursor: pointer;
			svg {
				width: var(--player-button-width);
				height: auto;
				transform: rotate(0deg);
				path {
					fill: var(--current-color);
				}
			}
		}
	}
}
</style>
