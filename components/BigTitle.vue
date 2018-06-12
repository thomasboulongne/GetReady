<template>
    <div class="titleWrapper MTKnox" :style="{
		'--easedMousePositionPercentX': easedMousePositionPercent.x.toFixed(2),
		'--easedMousePositionPercentY': easedMousePositionPercent.y.toFixed(2)
    }">
        <slot></slot>
        <h2 class="MTKnox">
            <div v-for="(letter, i) in title" :key="letter + i">
                <span class="letter">{{ letter }}</span>
            </div>
        </h2>
    </div>
</template>
<script>
export default {
	props: {
		title: {
			default: 'Organize'
		}
	},

	computed: {
		easedMousePositionPercent: function() {
			return this.$store.getters.easedMousePositionPercent;
		}
	}
};
</script>


<style lang="scss">
.titleWrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    color: white;
    height: 50%;
    pointer-events: none;
    margin-top: var(--titleTopOffset);
    --titleWrapperDelay: 2s;
    transform: translate(calc(var(--easedMousePositionPercentX) * 0.03%), calc(var(--easedMousePositionPercentY) * 0.03%));
    @-moz-document url-prefix() {
        transform-style: preserve-3d;
    }
    h2 {
        font-size: 16vmax;
        margin: 0;
        white-space: nowrap;
        position: relative;
        display: block;
        --yOffset: -0.035em; // Used for title slope
        @-moz-document url-prefix() {
            transform-style: preserve-3d;
        }
        div {
            display: inline-block;
            position: relative;
            z-index: 2;
            transform-style: preserve-3d;
            span {
                display: inline-block;
                transform-style: preserve-3d;
            }
            @for $i from 1 to 30 {
                &:nth-child(#{$i}) {
                    span {
                        transition: transform calc(var(--transition-speed) * 1.15) var(--ease) calc(#{$i} * 0.03s);
                    }
                }
            }
        }
    }
}
</style>
