<script>
export default {
	props: {
		title: {
			default: ''
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
				class: 'quickNavItem',
				ref: 'quickNavItem'
			}, shortTitleElm));
		});

		return createElement('div', {class: 'mainPart'}, [
			createElement('h2', {}, [
				createElement('span', this.title.split('_')[0]),
				createElement('span', this.title.split('_')[1])
			]),
			createElement('div', {class: 'blocks'}, [
				...this.$slots.block,
				createElement('div', {class: 'quickNav'}, [
					createElement('ul', {}, items)
				])
			])
		]);
	},
	methods: {
		quickNavClick(i) {
			console.log(i, this.$refs);
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
			margin-bottom: 4rem;
			.blockIntroText {
				max-width: 70%;
			}
			&:first-child {
				h3 {
					margin-top: 0;
				}
			}
		}
		.quickNav {
			position: absolute;
			// top: var(--blockMarginTop);
			left: var(--spacingHorizontal);
			.quickNavItem {
				cursor: pointer;
			}
		}
	}
}
</style>
