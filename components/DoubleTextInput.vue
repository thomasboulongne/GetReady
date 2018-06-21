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
								<svg width="36" height="36" viewBox="0 -1 36 36" @click="removeField(i)">
									<g fill="none" fill-rule="evenodd">
										<text fill="#797979" font-family="Open Sans" font-size="18" font-weight="600" letter-spacing="1.523">
											<tspan x="6" y="32">+</tspan>
										</text>
										<circle cx="17" cy="17" r="17" stroke="#797979"/>
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
								<svg width="36" height="36" viewBox="0 -1 36 36">
									<g fill="none" fill-rule="evenodd">
										<text fill="#797979" font-family="Open Sans" font-size="18" font-weight="600" letter-spacing="1.523">
											<tspan x="6" y="32">+</tspan>
										</text>
										<circle cx="17" cy="17" r="17" stroke="#797979"/>
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
