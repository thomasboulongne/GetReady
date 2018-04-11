<template>
	<div class="example">
		<h1>Example</h1>
	</div>
</template>

<style lang="scss">
@import '~assets/scss/variables.scss';

$example-color: cyan;
.example {
	background-color: $color;
	color: $example-color;
	@include breakpoint($mobile-small) {
		color: $color;
		background-color: $example-color;
	}
	@include breakpoint($mobile-medium) {
		color: $example-color;
		background-color: $color;
	}
	@include breakpoint($mobile-large) {
		color: $color;
		background-color: $example-color;
	}
	@include breakpoint($tablet-portrait) {
		color: $example-color;
		background-color: $color;
	}
	@include breakpoint($tablet-landscape) {
		color: $color;
		background-color: $example-color;
	}
}

</style>
