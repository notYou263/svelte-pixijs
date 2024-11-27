<script lang="ts">
	import BasicPixiApp from '$lib-site/PixiApps/Basic/PixiApp.svelte';

	import type { PageData } from './$types.js';

	let { data }: PageData = $props();

	const assets = [
		{ alias: 'snake', src: '/assets/snake.png' },
		{ alias: 'spiral_hole', src: '/assets/spiral_hole.png' },
		'/assets/bg_mesh.jpg',
		'/assets/bg_grass.jpg',
		'/assets/nine-slice-blue.png',
		'/assets/tunelring.png',
		'/assets/laser/blue_02.png',
		'/assets/laser/red_02.png',
		'/assets/laser/green_02.png',
		'/assets/adventurer-spritesheet.json'
	];
</script>

<BasicPixiApp {assets}>
	{#snippet view()}
		<div class="outline outline-2 -outline-offset-4 outline-blue-500">
			<!-- <div class="pixi-app w-half aspect-[16/9] py-4"></div> -->
		</div>
	{/snippet}
</BasicPixiApp>
