<template>
	<div class="textInputComp">
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
		<div class="inputs" v-if="open">
			<div class="example">
				<span class="label" v-t="'Example'"></span>
				<div class="multiple">
					<ol>
						<li v-for="(field, i) in fields" :key="i" :data-count="i + 1">
							<div class="sentence">
								<input @keydown.enter="addNewField" @change="updateField(i)" :value="field" type="text" :class="i === fields.length - 1 ? 'last' : ''">
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
					</ol>
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
		}
	},
	data() {
		return {
			open: false
		};
	},
	computed: {
		fields: function() {
			return this.$store.getters.userData(this.storeIdentifier);
		}
	},
	methods: {
		addNewField() {
			this.$store.dispatch('userDataAddField', this.storeIdentifier);
			this.$nextTick(() => {
				this.$el.querySelector('input.last').focus();
			});
		},
		updateField(i) {
			this.$store.dispatch('userDataUpdateField', {key: this.storeIdentifier, i: i, value: this.$el.querySelectorAll('input')[i].value});
		},
		removeField(i) {
			this.$store.dispatch('userDataRemoveField', {key: this.storeIdentifier, i: i});
		}
	}
};
</script>
<style lang="scss">
.textInputComp {
	margin-top: 1rem;
	.open, .close {
		display: inline-block;
		font-size: 0.7rem;
		color: var(--currentColor);
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
				fill: var(--currentColor);
			}
		}
		.arrowIcon {
			width: 1.2em;
			margin-left: 0.6em;
			vertical-align: middle;
			path {
				stroke: var(--currentColor);
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
		.example {
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
						&:first-child {
							svg {
								opacity: 0;
								pointer-events: none;
							}
						}
					}
				}
			}
		}
	}
}
</style>
