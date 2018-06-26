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
			<div :class="['savedTooltip', savedTooltip ? 'show': '']">
				<svg width="12" height="15" viewBox="0 0 12 15">
					<g fill="#5781F8" fill-rule="nonzero">
						<path d="M9.174.287H.23v14.426h11.54V2.883L9.174.288zm1.154 12.983H1.672V1.73h1.443v1.442h1.442V1.73H6v1.442h1.443V1.73h1.154l1.73 1.73v9.81z"/>
						<path d="M5.292 8.985L4.21 7.83 3.2 8.84l2.092 2.163L8.97 7.326l-1.01-1.01z"/>
					</g>
				</svg>
				<span v-t="'Saved in your summary card'"></span>
			</div>
		</div>
	</div>
</template>
<script>
import debounce from 'lodash/debounce';
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
			open: false,
			savedTooltip: false
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
			this.debouncedSaveTip();
		},
		removeField(i) {
			this.$store.dispatch('userDataRemoveField', {key: this.storeIdentifier, i: i});
			this.debouncedSaveTip();
		},
		debouncedSaveTip: debounce(function() {
			this.savedTooltip = true;
			setTimeout(() => {
				this.savedTooltip = false;
			}, 2500);
		}, 1000)
	}
};
</script>
<style lang="scss">
.doubleTextInputComp {
	margin-top: 1rem;
	.inputs {
		position: relative;
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
							background-color: var(--light-grey);
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
