<template>
	<div :class="['mainQuote', quote['Audio'] !== undefined ? 'hasAudio' : '']">
		<div class="coloredBackground"></div>
		<div class="content">
			<div class="illustrationWrapper">
				<div class="illustration withShadow">
					<img class="shadow" :src="PATH + quote['Image']" alt="">
					<img :src="PATH + quote['Image']" alt="">
				</div>
			</div>
			<div class="text">
				<svg width="40" height="32" viewBox="0 0 40 32">
					<g fill="#FF7056" fill-rule="nonzero">
						<path d="M27.895 17.404c.854.255 1.709.384 2.54.384a7.752 7.752 0 0 0 3.186-.676c-.801 3.035-2.725 8.272-6.557 8.862a.922.922 0 0 0-.742.678l-.838 3.1a.97.97 0 0 0 .116.771c.145.228.377.38.637.417.283.04.571.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C35.294 2.3 33.025 1.12 30.105 1h-.035c-3.603 0-6.797 2.512-7.77 6.108a8.561 8.561 0 0 0 .74 6.35 8.145 8.145 0 0 0 4.854 3.946zM2.042 13.457a8.144 8.144 0 0 0 4.853 3.947c.854.255 1.709.384 2.54.384a7.754 7.754 0 0 0 3.186-.675c-.8 3.034-2.724 8.271-6.557 8.86a.922.922 0 0 0-.742.679l-.838 3.1a.97.97 0 0 0 .116.771c.144.228.376.38.637.417.282.04.57.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C14.294 2.3 12.025 1.118 9.105 1H9.07C5.468 1 2.273 3.512 1.301 7.108a8.566 8.566 0 0 0 .74 6.35z"/>
					</g>
				</svg>
				<div class="quote" v-html="quote['Quote']"></div>
				<div class="athlete">
					<span class="name" v-html="quote['Athlete']"></span>
					<span class="description" v-html="quote['Athlete description']"></span>
				</div>
			</div>
		</div>
		<div class="audioWrapper" v-if="quote['Audio'] !== undefined">
			<div class="audio">
				<div class="infos">
					<span class="title" v-html="quote['Audio']['Title']"></span>
					<span class="duration" v-html="quote['Audio']['Duration']"></span>
					<span class="description" v-html="quote['Audio']['Description']"></span>
				</div>
				<div class="player">
					<div class="play">
						<svg viewBox="0 0 100 100" height="100" width="100">
							<path fill-rule="evenodd" fill="#000000" d="M0,50 C0,22.3857625 22.3796909,0 50,0 C77.6142375,0 100,22.3796909 100,50 C100,77.6142375 77.6203091,100 50,100 C22.3857625,100 0,77.6203091 0,50 L0,50 Z M69.562304,52.4504362 L43.7392652,69.3676758 C41.674126,70.7205938 40,69.8291419 40,67.3934481 L40,32.6080749 C40,30.1648211 41.674252,29.2810117 43.7392652,30.6338472 L69.562304,47.5510868 C71.6274431,48.9040048 71.6273172,51.0976007 69.562304,52.4504362 L69.562304,52.4504362 Z"/>
						</svg>
					</div>
				</div>
				<div class="playerInfos">
					<span class="time" v-html="audioTime"></span>
					<div class="timeline">
						<svg viewBox="0 0 419 33" class="base">
							<path stroke="#D5D5D5" d="M44.816 12.501h.858v7.626h-.858V12.5zm14.605 0h.859v7.626h-.859V12.5zm40.165 0h.858v7.626h-.858V12.5zm-51.119 1.463h.859v4.699h-.859v-4.699zm7.303 0h.858v4.699h-.858v-4.699zm51.118 0h.859v4.699h-.859v-4.699zm3.652 1.743h.858v1.214h-.858v-1.214zm-7.303-1.743h.859v4.699h-.859v-4.699zm-50.26 3.25h-.859v-1.8h.859v1.8zm-37.372-8.32h.859v14.84h-.859V8.894zm14.605 0h.86v14.84h-.86V8.894zm10.954 0h.86v14.84h-.86V8.894zm21.909 0h.858v14.84h-.858V8.894zm32.861 0h.86v14.84h-.86V8.894zm-29.21-3.606h.859V27.34h-.86V5.29zm7.303 0h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.859V27.34h-.86V5.29zm3.651 0h.859V27.34h-.859V5.29zm-73.026-.822h.858v23.695h-.858V4.466zm7.302 0h.859v23.695h-.859V4.466zm7.303 0h.859v23.695h-.86V4.466zM22.908 1h.859v30.628h-.86V1zm14.605 0h.859v30.628h-.859V1zm32.862 0h.859v30.628h-.859V1zm7.303 0h.859v30.628h-.86V1zm7.302 0h.86v30.628h-.86V1zm28.07 13.622h.859v3.383h-.86v-3.383zm3.651-1.053h.859v5.49h-.859v-5.49zm3.652-1.51h.858v8.51h-.858v-8.51zm3.65 1.51h.86v5.49h-.86v-5.49zm32.863 0h.858v5.49h-.858v-5.49zm40.164 0h.859v5.49h-.86v-5.49zm7.303 1.053h.858v3.383h-.858v-3.383zm3.65 1.255h.86v.873h-.86v-.873zm-7.302-1.255h.859v3.383h-.859v-3.383zm-73.026-3.651h.859v10.685h-.859V10.97zm14.605 0h.86v10.685h-.86V10.97zm10.954 0h.86v10.685h-.86V10.97zm7.303 0h.859v10.685h-.86V10.97zm32.862 0h.858v10.685h-.858V10.97zm-29.21-2.596h.858v15.876h-.859V8.375zm7.302 0h.859v15.876h-.86V8.375zm7.302 0h.86v15.876h-.86V8.375zm7.303 0h.859v15.876h-.859V8.375zm3.651 0h.86v15.876h-.86V8.375zm-58.42-.591h.858v17.06h-.859V7.784zm7.302 0h.859v17.06h-.859V7.784zm7.303 0h.858v17.06h-.858V7.784zm-10.954-2.496h.858V27.34h-.858V5.29zm14.605 0h.859V27.34h-.859V5.29zm18.257 0h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.858V27.34h-.858V5.29zm28.088 8.676h.859v4.699h-.859v-4.699zm3.651-1.463h.86v7.626h-.86V12.5zm3.652-2.096h.858v11.817h-.858V10.405zm3.651 2.096h.859v7.626h-.859V12.5zm32.862 0h.859v7.626h-.86V12.5zm14.605 0h.859v7.626h-.859V12.5zm40.164 0h.86v7.626h-.86V12.5zm-51.118 1.463h.859v4.699h-.859v-4.699zm7.303 0h.858v4.699h-.858v-4.699zm51.118 0h.859v4.699h-.859v-4.699zm3.651 1.743h.859v1.214h-.859v-1.214zm-7.302-1.743h.858v4.699h-.858v-4.699zm-50.26 3.25h-.859v-1.8h.86v1.8zm-37.372-8.32h.86v14.84h-.86V8.894zm14.606 0h.858v14.84h-.858V8.894zm10.954 0h.858v14.84h-.858V8.894zm21.907 0h.86v14.84h-.86V8.894zm32.862 0h.859v14.84h-.859V8.894zm-29.21-3.606h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.859V27.34h-.86V5.29zm7.302 0h.86V27.34h-.86V5.29zm3.652 0h.858V27.34h-.858V5.29zm-73.026-.822h.858v23.695h-.858V4.466zm7.302 0h.859v23.695h-.859V4.466zm7.303 0h.859v23.695h-.86V4.466zM232.42 1h.859v30.628h-.859V1zm14.605 0h.859v30.628h-.859V1zm32.862 0h.859v30.628h-.86V1zm7.303 0h.858v30.628h-.858V1zm7.302 0h.859v30.628h-.859V1zm28.07 13.622h.859v3.383h-.859v-3.383zm3.651-1.053h.86v5.49h-.86v-5.49zm3.652-1.51h.858v8.51h-.858v-8.51zm3.651 1.51h.859v5.49h-.859v-5.49zm32.862 0h.859v5.49h-.86v-5.49zm40.164 0h.859v5.49h-.859v-5.49zm7.303 1.053h.859v3.383h-.86v-3.383zm3.651 1.255h.859v.873h-.859v-.873zm-7.303-1.255h.86v3.383h-.86v-3.383zm-73.026-3.651h.859v10.685h-.859V10.97zm14.606 0h.858v10.685h-.858V10.97zm10.953 0h.86v10.685h-.86V10.97zm7.303 0h.859v10.685h-.859V10.97zm32.862 0h.859v10.685h-.86V10.97zm-29.21-2.596h.858v15.876h-.859V8.375zm7.302 0h.859v15.876h-.859V8.375zm7.303 0h.858v15.876h-.858V8.375zm7.302 0h.859v15.876h-.859V8.375zm3.652 0h.858v15.876h-.858V8.375zm-58.421-.591h.858v17.06h-.858V7.784zm7.302 0h.859v17.06h-.859V7.784zm7.303 0h.859v17.06h-.86V7.784zM344.47 5.288h.859V27.34h-.859V5.29zm14.605 0h.859V27.34h-.859V5.29zm18.257 0h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.859V27.34h-.86V5.29z"/>
							<path stroke="#D5D5D5" d="M1 13.964v4.699h.859v-4.699zM4.651 12.501v7.626h.86V12.5zM8.303 10.405v11.817h.858V10.405zM11.954 12.501v7.626h.859V12.5z"/>
						</svg>
						<svg viewBox="0 0 419 33" class="progress">
							<path d="M44.816 12.501h.858v7.626h-.858V12.5zm14.605 0h.859v7.626h-.859V12.5zm40.165 0h.858v7.626h-.858V12.5zm-51.119 1.463h.859v4.699h-.859v-4.699zm7.303 0h.858v4.699h-.858v-4.699zm51.118 0h.859v4.699h-.859v-4.699zm3.652 1.743h.858v1.214h-.858v-1.214zm-7.303-1.743h.859v4.699h-.859v-4.699zm-50.26 3.25h-.859v-1.8h.859v1.8zm-37.372-8.32h.859v14.84h-.859V8.894zm14.605 0h.86v14.84h-.86V8.894zm10.954 0h.86v14.84h-.86V8.894zm21.909 0h.858v14.84h-.858V8.894zm32.861 0h.86v14.84h-.86V8.894zm-29.21-3.606h.859V27.34h-.86V5.29zm7.303 0h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.859V27.34h-.86V5.29zm3.651 0h.859V27.34h-.859V5.29zm-73.026-.822h.858v23.695h-.858V4.466zm7.302 0h.859v23.695h-.859V4.466zm7.303 0h.859v23.695h-.86V4.466zM22.908 1h.859v30.628h-.86V1zm14.605 0h.859v30.628h-.859V1zm32.862 0h.859v30.628h-.859V1zm7.303 0h.859v30.628h-.86V1zm7.302 0h.86v30.628h-.86V1zm28.07 13.622h.859v3.383h-.86v-3.383zm3.651-1.053h.859v5.49h-.859v-5.49zm3.652-1.51h.858v8.51h-.858v-8.51zm3.65 1.51h.86v5.49h-.86v-5.49zm32.863 0h.858v5.49h-.858v-5.49zm40.164 0h.859v5.49h-.86v-5.49zm7.303 1.053h.858v3.383h-.858v-3.383zm3.65 1.255h.86v.873h-.86v-.873zm-7.302-1.255h.859v3.383h-.859v-3.383zm-73.026-3.651h.859v10.685h-.859V10.97zm14.605 0h.86v10.685h-.86V10.97zm10.954 0h.86v10.685h-.86V10.97zm7.303 0h.859v10.685h-.86V10.97zm32.862 0h.858v10.685h-.858V10.97zm-29.21-2.596h.858v15.876h-.859V8.375zm7.302 0h.859v15.876h-.86V8.375zm7.302 0h.86v15.876h-.86V8.375zm7.303 0h.859v15.876h-.859V8.375zm3.651 0h.86v15.876h-.86V8.375zm-58.42-.591h.858v17.06h-.859V7.784zm7.302 0h.859v17.06h-.859V7.784zm7.303 0h.858v17.06h-.858V7.784zm-10.954-2.496h.858V27.34h-.858V5.29zm14.605 0h.859V27.34h-.859V5.29zm18.257 0h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.858V27.34h-.858V5.29zm28.088 8.676h.859v4.699h-.859v-4.699zm3.651-1.463h.86v7.626h-.86V12.5zm3.652-2.096h.858v11.817h-.858V10.405zm3.651 2.096h.859v7.626h-.859V12.5zm32.862 0h.859v7.626h-.86V12.5zm14.605 0h.859v7.626h-.859V12.5zm40.164 0h.86v7.626h-.86V12.5zm-51.118 1.463h.859v4.699h-.859v-4.699zm7.303 0h.858v4.699h-.858v-4.699zm51.118 0h.859v4.699h-.859v-4.699zm3.651 1.743h.859v1.214h-.859v-1.214zm-7.302-1.743h.858v4.699h-.858v-4.699zm-50.26 3.25h-.859v-1.8h.86v1.8zm-37.372-8.32h.86v14.84h-.86V8.894zm14.606 0h.858v14.84h-.858V8.894zm10.954 0h.858v14.84h-.858V8.894zm21.907 0h.86v14.84h-.86V8.894zm32.862 0h.859v14.84h-.859V8.894zm-29.21-3.606h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.859V27.34h-.86V5.29zm7.302 0h.86V27.34h-.86V5.29zm3.652 0h.858V27.34h-.858V5.29zm-73.026-.822h.858v23.695h-.858V4.466zm7.302 0h.859v23.695h-.859V4.466zm7.303 0h.859v23.695h-.86V4.466zM232.42 1h.859v30.628h-.859V1zm14.605 0h.859v30.628h-.859V1zm32.862 0h.859v30.628h-.86V1zm7.303 0h.858v30.628h-.858V1zm7.302 0h.859v30.628h-.859V1zm28.07 13.622h.859v3.383h-.859v-3.383zm3.651-1.053h.86v5.49h-.86v-5.49zm3.652-1.51h.858v8.51h-.858v-8.51zm3.651 1.51h.859v5.49h-.859v-5.49zm32.862 0h.859v5.49h-.86v-5.49zm40.164 0h.859v5.49h-.859v-5.49zm7.303 1.053h.859v3.383h-.86v-3.383zm3.651 1.255h.859v.873h-.859v-.873zm-7.303-1.255h.86v3.383h-.86v-3.383zm-73.026-3.651h.859v10.685h-.859V10.97zm14.606 0h.858v10.685h-.858V10.97zm10.953 0h.86v10.685h-.86V10.97zm7.303 0h.859v10.685h-.859V10.97zm32.862 0h.859v10.685h-.86V10.97zm-29.21-2.596h.858v15.876h-.859V8.375zm7.302 0h.859v15.876h-.859V8.375zm7.303 0h.858v15.876h-.858V8.375zm7.302 0h.859v15.876h-.859V8.375zm3.652 0h.858v15.876h-.858V8.375zm-58.421-.591h.858v17.06h-.858V7.784zm7.302 0h.859v17.06h-.859V7.784zm7.303 0h.859v17.06h-.86V7.784zM344.47 5.288h.859V27.34h-.859V5.29zm14.605 0h.859V27.34h-.859V5.29zm18.257 0h.858V27.34h-.858V5.29zm7.302 0h.859V27.34h-.859V5.29zm7.303 0h.859V27.34h-.86V5.29z"/>
							<path d="M1 13.964v4.699h.859v-4.699zM4.651 12.501v7.626h.86V12.5zM8.303 10.405v11.817h.858V10.405zM11.954 12.501v7.626h.859V12.5z"/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		quote: {
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			PATH: process.env.PATH,
			audioTime: '0:00'
		};
	}
};
</script>
<style lang="scss">
.mainQuote {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding: 6.5rem 0 0 0;
	position: relative;
	&.hasAudio {
		.content {
			.text {
				padding-bottom: 15rem;
			}
		}
	}
	.content {
		display: flex;
		position: relative;
		align-items: stretch;
		height: 100%;
		.illustrationWrapper {
			width: 33%;
			position: relative;
			.illustration {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
					object-position: top right;
				}
			}
		}
		.text {
			width: 66%;
			padding-bottom: 12rem;
			svg {
				* {
					fill: var(--current-color);
				}
			}
			.quote {
				width: 75%;
				line-height: 2;
				font-style: italic;
				margin: 2rem 0;
				font-size: 1.1rem;
			}
			.athlete {
				.name {
					font-family: Antonio;
					font-size: 1.1rem;
					font-weight: bold;
					color: var(--current-color);
					text-transform: uppercase;
					display: block;
				}
				.description {
					font-style: italic;
					font-size: 0.7rem;
					margin-top: 1rem;
					display: inline-block;
					width: 33%;
					font-weight: 300;
				}
			}
		}
	}
	.audioWrapper {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		width: 66%;
		.audio {
			width: 100%;
			box-sizing: border-box;
			background-color: white;
			border-radius: 1rem;
			padding: 2.44rem 3.6rem;
			box-shadow: 0 2px 25px 0 rgba(197, 197, 197, 0.28);
			display: flex;
			align-items: center;
			.infos {
				width: calc(50% - var(--player-button-width) / 2);
				flex-grow: 0;
				flex-shrink: 0;
				box-sizing: border-box;
				padding-right: 2rem;
				.title, .duration {
					display: inline-block;
					color: var(--current-color);
				}
				.title {
					font-family: 'Antonio';
					font-weight: 600;
					margin-right: 0.6rem;
					text-transform: uppercase;
					font-size: 1.38rem;
				}
				.duration {
					font-size: 0.88rem;
					font-style: italic;
					font-weight: 300;
				}
				.description {
					margin-top: 0.4rem;
					display: block;
					font-size: 0.88rem;
				}
			}
			.playerInfos {
				width: calc(50% - var(--player-button-width) / 2);
				flex-grow: 0;
				flex-shrink: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: border-box;
				padding-left: 2rem;
				.time {
					font-size: 0.77rem;
				}
				.timeline {
					position: relative;
					--track-progress: 0;
					// display: flex;
					width: calc(100% - 4rem);
					svg {
						width: 100%;
						height: auto;
						display: block;
					}
					.progress {
						position: absolute;
						left: 0;
						top: 0;
						path {
							stroke: var(--current-color);
						}
						clip-path: polygon(0 0, calc(var(--track-progress) * 1%) 0, calc(var(--track-progress) * 1%) 100%, 0 100%);
					}
				}
			}
		}
	}
}
</style>
