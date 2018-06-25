<template>
	<div :class="['textInputComp', numbered ? 'numbered' : '', labeled ? 'labeled' : '']">
		<div class="opening" v-if="$slots.default !== undefined">
			<div class="open" v-if="!open" @click="() => {this.open = true;}">
				<svg class="editIcon icon" width="14" height="14" viewBox="0 0 14 14">
					<path fill-rule="nonzero" d="M10.285.003a.522.522 0 0 0-.307.15L1.014 9.118a.52.52 0 0 0-.14.248l-.862 3.792a.527.527 0 0 0 .139.481.527.527 0 0 0 .48.139l3.793-.862a.52.52 0 0 0 .253-.14l8.964-8.964a.537.537 0 0 0 0-.727L10.71.154a.525.525 0 0 0-.426-.151zm.06 1.244l2.197 2.204-.991.99-2.198-2.197.991-.997zM8.62 2.971l2.198 2.203-6.335 6.335-2.197-2.198 6.334-6.34zm-6.878 7.256l1.826 1.826-2.36.533.534-2.359z"/>
				</svg>
				<span><slot></slot></span>
				<svg class="arrowIcon icon" width="14" height="8" viewBox="0 0 14 8">
					<path fill="none" fill-rule="evenodd" d="M1 0l6.292 7.429L13.242 0"/>
				</svg>
			</div>
			<div class="close" v-else @click="() => {this.open = false;}">
				<span v-t="'Hide'"></span>
				<svg class="arrowIcon icon" width="14" height="8" viewBox="0 0 14 8">
					<path fill="none" fill-rule="evenodd" d="M1 0l6.292 7.429L13.242 0"/>
				</svg>
			</div>
		</div>
		<div class="inputs" v-if="open || $slots.default === undefined">
			<div :class="[example ? 'example' : '', 'inputsWrapper']">
				<span class="label" v-if="labeled" v-t="'Example'"></span>
				<div class="multiple">
					<ol>
						<li v-for="(field, i) in fields" :key="i" :data-count="i + 1">
							<div class="sentence">
								<input @input="updateField(i)" :value="field" type="text">
								<svg @click="removeField(i)" width="16" height="16" viewBox="0 0 16 16">
									<g fill="none" fill-rule="evenodd" stroke="#5D666D" stroke-linecap="square">
										<path d="M.5.5l15 15M15.5.5l-15 15"/>
									</g>
								</svg>
							</div>
						</li>
						<li :data-count="fields.length + 1">
							<div class="sentence">
								<input @input="addNewField()" type="text" :class="'last'">
								<svg width="16" height="16" viewBox="0 0 16 16">
									<g fill="none" fill-rule="evenodd" stroke="#5D666D" stroke-linecap="square">
										<path d="M.5.5l15 15M15.5.5l-15 15"/>
									</g>
								</svg>
							</div>
						</li>
					</ol>
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
		numbered: {
			default: true
		},
		labeled: {
			default: true
		},
		example: {
			default: true
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
			const value = this.$el.querySelector('input.last').value;
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
			this.$store.dispatch('userDataUpdateField', {key: this.storeIdentifier, i: i, value: this.$el.querySelectorAll('input')[i].value});
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
.textInputComp {
	margin-top: 1rem;
	.open, .close {
		display: inline-block;
		font-size: 0.7rem;
		color: var(--current-color);
		text-transform: uppercase;
		font-weight: 600;
		cursor: pointer;
		span {
			vertical-align: middle;
		}
		.editIcon {
			width: 1.2em;
			margin-right: 0.6em;
			vertical-align: middle;
			path {
				fill: var(--current-color);
			}
		}
		.arrowIcon {
			width: 1.2em;
			margin-left: 0.6em;
			vertical-align: middle;
			path {
				stroke: var(--current-color);
			}
		}
	}
	.close {
		color: var(--grey);
		.arrowIcon {
			transform: scale(-1);
			path {
				stroke: var(--grey);
			}
		}
	}
	.inputs {
		position: relative;
		.inputsWrapper {
			display: flex;
			margin-top: 2rem;
			.label {
				opacity: 0;
			}
			.multiple {
				width: 100%;
				ol {
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
							width: 100%;
							border: none;
							background-color: var(--lightGrey);
							line-height: 1.6;
							padding: 0.3em 1em;
							font-family: 'Open Sans', sans-serif;
							vertical-align: middle;
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
