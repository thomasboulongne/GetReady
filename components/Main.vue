<script>
export default {
	props: {
		title: {
			default: ''
		}
	},
	data() {
		return {
			quickNavPosition: 'above',
			currentBlock: 0,
			offset: 0.4
		};
	},
	computed: {
		vh: function() {
			return this.$store.getters.viewportSize.height;
		}
	},
	render: function(createElement) {
		const items = [];
		this.$slots.block.forEach((slot, i) => {
			const shortTitleElm = slot.children.find(child => child.data.attrs && child.data.attrs.shortTitle).data.attrs.shortTitle;
			items.push(createElement('li', {
				on: {
					click: this.quickNavClick.bind(this, i)
				},
				class: ['quickNavItem', i === this.currentBlock ? 'selected' : ''],
				ref: 'quickNavItem'
			}, shortTitleElm));
		});

		return createElement('div', {class: 'mainPart'}, [
			createElement('h2', {}, [
				createElement('span', this.title.split('_')[0]),
				createElement('span', this.title.split('_')[1])
			]),
			createElement('div', {class: 'blocks', ref: 'blocks'}, [
				...this.$slots.block,
				createElement('div', {class: ['quickNav', this.quickNavPosition]}, [
					createElement('ul', {}, items)
				])
			])
		]);
	},
	mounted() {
		this.updateQuickNav();
	},
	watch: {
		'$store.getters.scrollPosition.y': function() {
			this.updateQuickNav();
		}
	},
	methods: {
		updateQuickNav() {
			const blocksRect = this.$refs.blocks.getBoundingClientRect();
			if (blocksRect.top > this.vh * this.offset) {
				this.quickNavPosition = 'above';
			} else if (blocksRect.bottom < this.vh) {
				this.quickNavPosition = 'below';
			} else {
				this.quickNavPosition = 'fixed';
				const blocksElm = Array.from(this.$el.querySelectorAll('.block'));
				for (let i = 0; i < blocksElm.length; i++) {
					const elementRect = blocksElm[i].getBoundingClientRect();
					if (elementRect.top < this.vh * this.offset && elementRect.bottom > this.vh * this.offset) {
						this.currentBlock = i;
						break;
					}
				}
			}
		},
		quickNavClick(i) {
			const to = this.$store.getters.scrollPosition.y + this.$el.querySelector('.block:nth-child(' + (i + 1) + ')').getBoundingClientRect().top - (this.vh * this.offset);

			TweenMax.to(window, 1, {
				scrollTo: to,
				ease: Power2.easeInOut
			});
		}
	}
};
</script>
<style lang="scss">
.mainPart {
	overflow: hidden;
	margin-top: 6rem;
	padding-bottom: 3rem;
	--blockMarginTop: 5rem;
	.blocks {
		margin-top: var(--blockMarginTop);
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		position: relative;
		.block {
			width: 66%;
			margin-bottom: 6rem;
			position: relative;
			.blockIntroText {
				max-width: 70%;
			}
			h3 {
				margin-top: 0;
			}
			.slider {
				.items {
					position: relative;
					z-index: 1;
				}
			}
		}
		.quickNav {
			position: absolute;
			left: var(--spacingHorizontal);
			&.above {
				top: 0;
			}
			&.fixed {
				position: fixed;
				top: 40vh;
			}
			&.below {
				top: calc(100% - 60vh);
			}
			.quickNavItem {
				cursor: pointer;
				font-size: 0.666rem;
				font-weight: 600;
				text-transform: uppercase;
				color: var(--textGrey);
				transition: color 0.8s;
				&:not(:last-child) {
					margin-bottom: 1.5rem;
				}
				&.selected {
					color: var(--current-color);
				}
			}
		}
	}
}
</style>
