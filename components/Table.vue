<template>
	<div :class="['tableInputComp']">
		<div class="coloredBackground"></div>
		<div class="tableWrapper">
			<table>
				<thead>
					<tr>
						<th v-for="name in columnNames" v-html="name" :key="name"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(values, key, index) in values" :key="key + index" :class="values[0] - values[1] === Math.max(...differences) ? 'max' : ''">
						<td><span v-html="key"></span></td>
						<td><span v-html="values[0]"></span></td>
						<td><span v-html="values[1]"></span></td>
						<td><span v-html="values[0] - values[1]"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
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
		<div class="tableWrapper" v-if="open">
			<table class="customTable">
				<thead>
					<tr>
						<th v-for="name in columnNames" v-html="name" :key="name"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(values, index) in customValues" :key="index" :class="parseInt(values.split('__')[1]) - parseInt(values.split('__')[2]) === Math.max(...customDifferences) ? 'max' : ''">
						<td><span><input @input="updateLine(index)" type="text" :value="values.split('__')[0]"></span></td>
						<td><span><input @input="updateLine(index)" type="text" :value="!isNaN(parseInt(values.split('__')[1])) ? parseInt(values.split('__')[1]) : ''"></span></td>
						<td><span><input @input="updateLine(index)" type="text" :value="!isNaN(parseInt(values.split('__')[2])) ? parseInt(values.split('__')[2]) : ''"></span></td>
						<td><span v-html="!isNaN(parseInt(values.split('__')[1]) - parseInt(values.split('__')[2])) ? parseInt(values.split('__')[1]) - parseInt(values.split('__')[2]) : '0'"></span></td>
						<td>
							<div @click="removeLine(index)">
								<svg width="36" height="36" viewBox="0 -1 36 36">
									<g fill="none" fill-rule="evenodd">
										<text fill="#797979" font-family="Open Sans" font-size="18" font-weight="600" letter-spacing="1.523">
											<tspan x="6" y="32">+</tspan>
										</text>
										<circle cx="17" cy="17" r="17" stroke="#797979"/>
									</g>
								</svg>
							</div>
						</td>
					</tr>
					<tr class="newLine">
						<td><span><input @input="addNewLine()" type="text"></span></td>
						<td><span><input disabled type="text"></span></td>
						<td><span><input disabled type="text"></span></td>
						<td><span>.</span></td>
						<td>
							<div>
								<svg width="36" height="36" viewBox="0 -1 36 36">
									<g fill="none" fill-rule="evenodd">
										<text fill="#797979" font-family="Open Sans" font-size="18" font-weight="600" letter-spacing="1.523">
											<tspan x="6" y="32">+</tspan>
										</text>
										<circle cx="17" cy="17" r="17" stroke="#797979"/>
									</g>
								</svg>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		storeIdentifier: {
			default: ''
		},
		columnNames: {
			default: function() {
				return [];
			}
		},
		values: {
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			open: false
		};
	},
	computed: {
		differences: function() {
			const differences = [];
			Object.values(this.values).forEach(values => {
				differences.push(values[0] - values[1]);
			});
			return differences;
		},
		customValues: function() {
			const data = this.$store.getters.userData(this.storeIdentifier);
			if (data !== undefined) {
				return data;
			}
			return [];
		},
		customDifferences: function() {
			const differences = [];
			Object.values(this.customValues).forEach(values => {
				differences.push(parseInt(values.split('__')[1]) - parseInt(values.split('__')[2]));
			});
			return differences;
		}
	},
	methods: {
		addNewLine() {
			const value = this.$el.querySelector('.customTable tbody tr.newLine input').value + '______';
			if (value !== '') {
				this.$store.dispatch('userDataAddField', { key: this.storeIdentifier, value: value });
				this.$nextTick(() => {
					this.$el.querySelector('.customTable tbody tr.newLine input').value = '';
					const field = this.$el.querySelector('.customTable tbody tr:nth-last-child(2) input') !== null ? this.$el.querySelector('.customTable tbody tr:nth-last-child(2) input') : this.$el.querySelector('.customTable tbody tr:nth-last-child(1) input');
					field.focus();
				});
			}
		},
		updateLine(i) {
			const inputs = Array.from(this.$el.querySelectorAll('.customTable tbody tr:nth-child(' + (i + 1) + ') input'));
			let value = '';
			inputs.forEach(input => {
				value += input.value;
				value += '__';
			});
			value = value.slice(0, -2);
			if (value !== '') {
				this.$store.dispatch('userDataUpdateField', { key: this.storeIdentifier, i: i, value: value });
			}
		},
		removeLine(i) {
			this.$store.dispatch('userDataRemoveField', { key: this.storeIdentifier, i: i });
		}
	}
};
</script>
<style lang="scss">
.tableInputComp {
	margin-top: 1rem;
	position: relative;
	width: 100vw;
	left: calc(-33vw - 4.3rem);
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	align-items: flex-end;
	padding: 4rem var(--spacingHorizontal);
	box-sizing: border-box;
	.opening {
		position: relative;
		width: 66%;
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
	}
	.tableWrapper {
		position: relative;
		width: 66%;
		flex-shrink: 0;
		table {
			border-collapse: collapse;
			td span {
				padding: 1rem 1.6rem;
			}
			thead {
				th {
					text-align: center;
					padding: 1rem 1rem;
					width: 12em;
					white-space: pre-wrap;
					font-size: 0.9rem;
  					font-weight: 600;
  					color: var(--grey);
					line-height: 1.2;
				}
			}
			tbody {
				tr {
					td {
						padding-bottom: 0.3rem;
						font-size: 0.83rem;
						span {
							background: white;
							width: calc(100% + 5px);
							display: block;
							box-sizing: border-box;
							text-align: center;
							input {
								width: 7rem;
								border: none;
								background-color: var(--lightGrey);
								line-height: 1.6;
								padding: 0.3em 1em;
								font-family: 'Open Sans', sans-serif;
								vertical-align: middle;
							}
						}
						&:first-child {
							span {
								text-align: left;
								border-radius: 0.5rem 0 0 0.5rem;
								color: #a9b1b6;
								font-weight: 600;
								font-size: 0.77rem;
								line-height: 1.9;
							}
						}
						&:last-child {
							span {
								width: 100%;
								border-radius: 0 0.5rem 0.5rem 0;
							}
						}
					}
					&.max {
						td:not(:first-child) {
							color: var(--currentColor);
							font-weight: 600;
						}
					}
				}
			}
			&.customTable {
				tbody {
					tr {
						&.newLine {
							td:nth-last-child(2) {
								color: transparent;
							}
							td:last-child {
								opacity: 0;
								pointer-events: none;
							}
						}
						td {
							line-height: 2.5;
							&:first-child {
								span {
									font-weight: initial;
									line-height: 2.5;
									font-size: 0.83rem;
								}
							}
							&:nth-last-child(2) {
								span {
									width: 100%;
									border-radius: 0 0.5rem 0.5rem 0;
								}
							}
							&:last-child {
								width: 3rem;
								div {
									height: 100%;
									display: flex;
									justify-content: center;
									align-items: center;
									cursor: pointer;
									svg {
										display: inline-block;
										width: 2.5rem;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
