<script>
export default {
	props: {
		title: {
			default: ''
		}
	},
	render: function(createElement) {
		return createElement('div', {class: 'mainPart'}, [
			createElement('h2', {}, [
				createElement('span', this.title.split('_')[0]),
				createElement('span', this.title.split('_')[1])
			]),
			createElement('div', {class: 'blocks'}, this.$slots.block)
		]);
	}
};
</script>
