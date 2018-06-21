<template>
	<div class="organize">
		<div class="pageIntro">
			<div class="definition">
				<h4 v-t="'Definition'"></h4>
				<p class="emphasedText" v-html="content['Definition text']"></p>
			</div>
			<p v-html="content['Goal types']['Intro text']"></p>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<img :src="PATH + content['Goal types']['Main goal illustration']" alt="">
					</div>
					<div class="title">
						<span>{{ content['Goal types']['Main goal'].split('_')[0] }}</span>
						<span>{{ content['Goal types']['Main goal'].split('_')[1] }}</span>
					</div>
					<p v-html="content['Goal types']['Main goal text']"></p>
				</div>
				<div class="block">
					<div class="illustration">
						<img :src="PATH + content['Goal types']['Sub goals illustration']" alt="">
					</div>
					<div class="title">
						<span>{{ content['Goal types']['Sub goals'].split('_')[0] }}</span>
						<span>{{ content['Goal types']['Sub goals'].split('_')[1] }}</span>
					</div>
					<p v-html="content['Goal types']['Sub goals text']"></p>
				</div>
			</div>
		</div>
		<div class="mainQuote">
			<div class="coloredBackground"></div>
			<div class="content">
				<div class="illustration withShadow">
					<img class="shadow" :src="PATH + content['Main quote']['Image']" alt="">
					<img :src="PATH + content['Main quote']['Image']" alt="">
				</div>
				<div class="text">
					<svg width="40" height="32" viewBox="0 0 40 32">
						<g fill="#FF7056" fill-rule="nonzero">
							<path d="M27.895 17.404c.854.255 1.709.384 2.54.384a7.752 7.752 0 0 0 3.186-.676c-.801 3.035-2.725 8.272-6.557 8.862a.922.922 0 0 0-.742.678l-.838 3.1a.97.97 0 0 0 .116.771c.145.228.377.38.637.417.283.04.571.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C35.294 2.3 33.025 1.12 30.105 1h-.035c-3.603 0-6.797 2.512-7.77 6.108a8.561 8.561 0 0 0 .74 6.35 8.145 8.145 0 0 0 4.854 3.946zM2.042 13.457a8.144 8.144 0 0 0 4.853 3.947c.854.255 1.709.384 2.54.384a7.754 7.754 0 0 0 3.186-.675c-.8 3.034-2.724 8.271-6.557 8.86a.922.922 0 0 0-.742.679l-.838 3.1a.97.97 0 0 0 .116.771c.144.228.376.38.637.417.282.04.57.06.857.06 4.6 0 9.154-4.97 11.077-12.087 1.128-4.175 1.459-10.452-1.32-14.403C14.294 2.3 12.025 1.118 9.105 1H9.07C5.468 1 2.273 3.512 1.301 7.108a8.566 8.566 0 0 0 .74 6.35z"/>
						</g>
					</svg>
					<div class="quote" v-html="content['Main quote']['Quote']"></div>
					<div class="athlete">
						<span class="name" v-html="content['Main quote']['Athlete']"></span>
						<span class="description" v-html="content['Main quote']['Athlete description']"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="mainPart">
			<h2>
				<span v-html="content['Main part']['Title'].split('_')[0]"></span>
				<span v-html="content['Main part']['Title'].split('_')[1]"></span>
			</h2>
			<div class="blocks">
				<div class="block block__1">
					<h3 v-html="content['Main part']['Parts'][0]['Title']"></h3>
					<p class="blockIntroText" v-html="content['Main part']['Parts'][0]['Text']"></p>
					<slider-comp :items="Object.values($t('cards'))" :componentType="'CardComp'"></slider-comp>
				</div>
				<div class="block block__2">
					<h3 v-html="content['Main part']['Parts'][1]['Title']"></h3>
					<ol class="blockSteps">
						<li class="blockStep" v-for="(step, i) in content['Main part']['Parts'][1]['Steps']" :key="i" :data-count="i + 1 < 10 ? '0' + (i + 1) : i + 1">
							<div class="stepContent">
								<div class="title" v-html="step.Title"></div>
								<div class="text" v-html="step.Text"></div>
								<div class="example" v-if="step.Example">
									<span class="label" v-t="'Example'"></span>
									<div class="simple">
										<div class="sentence">
											<span v-html="step.Example"></span>
										</div>
									</div>
								</div>
								<div class="example" v-if="step.ExampleSteps">
									<span class="label" v-t="'Example'"></span>
									<div class="multiple">
										<ol>
											<li v-for="(exampleStep, j) in step.ExampleSteps" :key="j" :data-count="j + 1">
												<div class="sentence">
													<span v-html="exampleStep"></span>
												</div>
											</li>
										</ol>
									</div>
								</div>
								<text-input-comp v-if="step['Input text']" :storeIdentifier="step['Input Store identifier']">{{ step['Input text'] }}</text-input-comp>
							</div>
						</li>
					</ol>
				</div>
				<div class="block block__3">
					<h3 v-html="content['Main part']['Parts'][2]['Title']"></h3>
					<p class="blockIntroText" v-html="content['Main part']['Parts'][2]['Text']"></p>
					<div class="detailsWrapper">
						<ul class="details">
							<li v-for="(detail, j) in content['Main part']['Parts'][2]['Details']" :key="j" v-html="detail">
							</li>
						</ul>
					</div>
					<div class="example">
						<span class="label" v-t="'Example'"></span>
						<div class="multiple">
							<ol>
								<li v-for="(exampleStep, j) in content['Main part']['Parts'][2]['ExampleSteps']" :key="j" :data-count="j + 1">
									<div class="sentence">
										<span v-html="exampleStep"></span>
									</div>
								</li>
							</ol>
						</div>
					</div>
					<text-input-comp v-if="content['Main part']['Parts'][2]['Input text']" :storeIdentifier="content['Main part']['Parts'][2]['Input Store identifier']">{{ content['Main part']['Parts'][2]['Input text'] }}</text-input-comp>
				</div>
				<div class="block block__4">
					<h3 v-html="content['Main part']['Parts'][3]['Title']"></h3>
					<p class="blockIntroText" v-html="content['Main part']['Parts'][3]['Text']"></p>
					<div class="detailsWrapper">
						<ul class="details">
							<li v-for="(detail, j) in content['Main part']['Parts'][3]['Details']" :key="j" v-html="detail">
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="quotes">
			<div class="coloredBackground"></div>
			<div class="content">
				<h2>
					<span v-html="$t('These celebrities approve').split('_')[0]"></span>
					<span v-html="$t('These celebrities approve').split('_')[1]"></span>
				</h2>
				<slider-comp :items="content['Quotes']" :componentType="'CelebrityComp'"></slider-comp>
			</div>
		</div>
		<div class="lastPart">
			<h2>
				<span v-html="content['Last part'].Title.split('_')[0]"></span>
				<span v-html="content['Last part'].Title.split('_')[1]"></span>
			</h2>
			<div class="blocks">
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][0].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][0].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][0].Text.split('\n').join('</p><p>') + '</p>'"></div>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][1].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][1].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][1].Text.split('\n').join('</p><p>') + '</p>'"></div>
						<span class="inputQuestion" v-html="content['Last part']['Blocks'][1]['Input question']"></span>
						<text-input-comp :storeIdentifier="content['Last part']['Blocks'][1]['Input store identifier']" :example="false" :labeled="false" :numbered="false"></text-input-comp>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][2].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][2].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][2].Text.split('\n').join('</p><p>') + '</p>'"></div>
						<double-text-input-comp :storeIdentifier="content['Last part']['Blocks'][2]['Input store identifier']" :prefix="content['Last part']['Blocks'][2]['Input prefix']" :conjunction="content['Last part']['Blocks'][2]['Input conjunction']"></double-text-input-comp>
					</div>
				</div>
				<div class="block">
					<div class="illustration">
						<video autoplay="true" playsinline muted loop :src="content['Last part']['Blocks'][3].Animation"></video>
					</div>
					<div class="content">
						<h3 v-html="content['Last part']['Blocks'][3].Title"></h3>
						<div v-html="'<p>' + content['Last part']['Blocks'][3].Text.split('\n').join('</p><p>') + '</p>'"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import TextInputComp from '~/components/TextInput';
import DoubleTextInputComp from '~/components/DoubleTextInput';
import SliderComp from '~/components/Slider';
export default {
	props: {
		content: {
			default: function() {
				return {};
			}
		}
	},
	data() {
		return {
			PATH: process.env.PATH
		};
	},
	components: {
		TextInputComp,
		DoubleTextInputComp,
		SliderComp
	}
};
</script>
