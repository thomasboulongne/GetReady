<template>
	<div :class="['doubleTextInputComp', 'textInput']">
		<div class="inputs">
			<div :class="['inputsWrapper']">
				<div class="multiple">
					<ul>
						<li v-for="(field, i) in fields" :key="i" :data-count="i + 1">
							<div class="sentence">
								<span v-html="prefix"></span>
								<input @input="updateField(i)" :value="field.split('__')[0]" type="text">
								<span v-html="conjunction"></span>
								<input @input="updateField(i)" :value="field.split('__')[1]" type="text">
								<svg @click="removeField(i)" width="16" height="16" viewBox="0 0 16 16">
									<g fill="none" fill-rule="evenodd" stroke="#5D666D" stroke-linecap="square">
										<path d="M.5.5l15 15M15.5.5l-15 15"/>
									</g>
								</svg>
							</div>
						</li>
						<li :data-count="fields.length + 1">
							<div class="sentence">
								<span v-html="prefix"></span>
								<input @input="addNewField()" type="text" :class="'last'">
								<span v-html="conjunction"></span>
								<input @input="addNewField()" type="text" :class="'last'">
								<svg width="16" height="16" viewBox="0 0 16 16">
									<g fill="none" fill-rule="evenodd" stroke="#5D666D" stroke-linecap="square">
										<path d="M.5.5l15 15M15.5.5l-15 15"/>
									</g>
								</svg>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		storeIdentifier: {
			default: ''
		},
		prefix: {
			default: ''
		},
		conjunction: {
			default: ''
		}
	},
	data() {
		return {
			open: false
		};
	},
	computed: {
		fields: function() {
			const fields = this.$store.getters.userData(this.storeIdentifier);
			if (fields !== undefined) {
				return fields;
			}
			return [];
		}
	},
	methods: {
		addNewField() {
			const inputs = Array.from(this.$el.querySelectorAll('input.last'));
			let value = '';
			inputs.forEach(input => {
				value += input.value;
				value += '__';
			});
			value = value.slice(0, -2);
			if (value !== '') {
				this.$store.dispatch('userDataAddField', { key: this.storeIdentifier, value: value });
				this.$nextTick(() => {
					this.$el.querySelector('input.last').value = '';
					const field = this.$el.querySelector('li:nth-last-child(2) input') !== null ? this.$el.querySelector('li:nth-last-child(2) input') : this.$el.querySelector('li:nth-last-child(1) input');
					field.focus();
				});
			}
		},
		updateField(i) {
			const inputs = Array.from(this.$el.querySelectorAll('[data-count="' + (i + 1) + '"] input'));
			let value = '';
			inputs.forEach(input => {
				value += input.value;
				value += '__';
			});
			value = value.slice(0, -2);
			this.$store.dispatch('userDataUpdateField', {key: this.storeIdentifier, i: i, value: value});
		},
		removeField(i) {
			this.$store.dispatch('userDataRemoveField', {key: this.storeIdentifier, i: i});
		}
	}
};
</script>
<style lang="scss">
.doubleTextInputComp {
	margin-top: 1rem;
	.inputs {
		.inputsWrapper {
			display: flex;
			margin-top: 2rem;
			.multiple {
				width: 100%;
				ul {
					width: 100%;
					li {
						align-items: center;
						width: 100%;
						.sentence {
							display: inline-flex;
							width: 100%;
							align-items: center;
							svg {
								margin-left: 1rem;
								flex-shrink: 0;
								height: 1.7rem;
							}
						}
						input {
							width: 5rem;
							flex-grow: 1;
							margin-left: 0.5rem;
							border: none;
							background-color: var(--lightGrey);
							line-height: 1.6;
							padding: 0.3em 1em;
							font-family: 'Open Sans', sans-serif;
							vertical-align: middle;
							&:first-of-type {
								margin-right: 0.5em;
							}
						}
						&:last-child {
							svg {
								opacity: 0;
								pointer-events: none;
							}
						}
						&:not(:last-child) {
							padding-bottom: 0.7rem;
							position: relative;
						}
					}
				}
			}
		}
	}
}
</style>
