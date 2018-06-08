<template>
	<div :class="['buttonComp', show ? 'show' : '']" :style="{'--buttonColor': color}">
		<div class="buttonWrapper">
			<div class="button">
				<div class="textWrapper">
					<span>{{ text }}</span>
				</div>
			</div>
		</div>
		<div class="buttonWrapper clone">
			<div class="button">
				<div aria-hidden="true" class="textWrapper">
					<span>{{ text }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		text: {
			default: 'Button'
		},
		color: {
			default: 'black'
		}
	},
	data() {
		return {
			show: false
		};
	}
};
</script>


<style lang="scss">

.buttonComp {
	--transition-delay: 0s;
	--offset: 40%;
	--computedOffset: calc(1 / 100 * var(--offset));
	position: relative;
	display: inline-block;
	.buttonWrapper {
		transform-style: preserve-3d;
		z-index: 2;
		clip-path: polygon(0 calc(100% - var(--offset)), 100% var(--offset), 100% var(--offset), 0% calc(100% - var(--offset)));
		transition: clip-path 0.5s var(--ease) var(--transition-delay);
		@supports (-ms-ime-align: auto) {
			&:before, &:after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				width: 120%;
				height: 100%;
				background-color: var(--currentColor);
				transition: background-color var(--backgroundTransitionDuration), transform calc(var(--transition-speed) * 1.3) var(--ease) var(--transition-delay);
				z-index: 1;
			}
			&:before {
				transform: translate(-50%, -99%) rotate(-6deg);
			}
			&:after {
				transform: translate(-50%, -1%) rotate(-6deg);
			}
		}
		.button {
			position: relative;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1rem;
			text-transform: uppercase;
			transform-style: preserve-3d;
			.textWrapper {
				transform-style: preserve-3d;
				position: relative;
				cursor: pointer;
				border: solid 1px white;
				padding: 0.7em 3em;
				border-radius: 10em;
				span {
					display: inline-block;
					opacity: 0;
					transform: translateY(10%);
					transition-duration: 0.2s;
					transition-timing-function: var(--ease);
					transition-property: opacity, transform;
					@for $i from 1 to 20 {
						&:nth-child(#{$i}) {
							transition-delay: calc(var(--transition-delay) / 1.5 + (#{$i} * 0.03s));
						}
					}
				}
			}
		}
		&.clone {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			transition-delay: 0s;
			transition-duration: 0.2s;
			.textWrapper {
				background-color: white;
				color: var(--buttonColor) !important;
			}
		}

	}
	&.show {
		.buttonWrapper {
			&:not(.clone) {
				clip-path: polygon(calc(var(--computedOffset) * -1) var(--computedOffset), calc(100% - var(--computedOffset)) calc(-100% + var(--computedOffset)), calc(100% + var(--computedOffset)) calc(100% - var(--computedOffset)), calc(var(--computedOffset)) calc(200% - var(--computedOffset)));
			}
			.button {
				.textWrapper {
					&:after {
						width: 33%;
					}
					span {
						opacity: 1;
						transform: none;
					}
				}
			}
			&:hover + .clone, &.clone:hover {
				clip-path: polygon(calc(var(--computedOffset) * -1) var(--computedOffset), calc(100% - var(--computedOffset)) calc(-100% + var(--computedOffset)), calc(100% + var(--computedOffset)) calc(100% - var(--computedOffset)), calc(var(--computedOffset)) calc(200% - var(--computedOffset)));
			}
		}
	}
}

</style>
