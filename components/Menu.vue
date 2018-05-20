<template>
	<div class="menu">
		<ul>
			<li v-for="(item, i) in items" :key="item.color + i">
				<div class="menuItem" ref="items">
					<div class="titleWrapper">
						<h2>
							<div v-for="(letter, i) in item.title" :key="letter + i">
								<span class="letter">{{ letter }}</span>
							</div>
						</h2>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		items: {
			default: function() {
				return [];
			}
		}
	},

	data() {
		return {
		};
	},

	computed: {
	},

	mounted() {
	},

	beforeDestroy() {
	},

	methods: {
	}
};
</script>


<style lang="scss">
@import '~assets/scss/variables.scss';
.menu {
}
</style>
