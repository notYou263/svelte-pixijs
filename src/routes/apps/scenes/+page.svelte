<script lang="ts">
	import PixiApp from '$lib-site/PixiApps/Scenes/PixiApp.svelte';
	import ScenesManager from '$lib-site/PixiComps/ScenesManager.svelte';

	import { SC_Components, SC_Draggable } from '$lib-site/PixiApps/Scenes/scenes/index.js';

	import type { PageData } from './$types.js';

	let { data }: PageData = $props();

	const assets = [
		{ alias: 'snake', src: '/assets/snake.png' },
		{ alias: 'rainbow', src: '/assets/rainbow.png' },
		{ alias: 'spiral_hole', src: '/assets/spiral_hole.png' },
		{ alias: 'eddie_face', src: '/assets/eddie.png' },
		{ alias: 'tiling_sprite', src: '/assets/tiling-sprite.jpeg' },
		'/assets/bg_mesh.jpg',
		'/assets/bg_grass.jpg',
		
		'/assets/nine-slice-blue.png',
		'/assets/tunelring.png',
		'/assets/laser/blue_02.png',
		'/assets/laser/red_02.png',
		'/assets/laser/green_02.png',
		'/assets/adventurer-spritesheet.json'
	];

	const scenes = [{
			label: "Components Test 1",
			comp: SC_Components
		},
		{
			label: "Draggable Nodes",
			comp: SC_Draggable
		}
	]
	
	let SCM
	let currentSceneIndex = $state(0)
	$inspect(currentSceneIndex)
</script>

<!-- Sidebar -->
<div
	class="absolute bottom-8 right-2 top-8 h-fit max-h-full w-48 bg-neutral-700/60 p-2 text-neutral-100 opacity-40 hover:opacity-100"
>
	<h5>Scenes</h5>
	<div class="grid content-stretch p-2">
		<select bind:value={currentSceneIndex} class="text-neutral-900  p-1">
			{#each scenes as scene,i }
				<option value={i}>{scene.label}</option>				
			{/each}
		</select>
	</div>
	<div class="grid columns-2 grid-flow-col justify-items-center content-stretch	 gap-2 p-2">
		<button class="w-full bg-slate-600 px-2 py-1 outline-1 hover:outline hover:outline-gray-400" onclick={()=> { SCM?.prevScene() } }>
			prev
		</button>
		<button class="w-full bg-slate-600 px-2 py-1 outline-1 hover:outline hover:outline-gray-400"  onclick={()=> { SCM?.nextScene() } }>
			next
		</button>
	</div>
</div>

<PixiApp {assets}>
	{#snippet view()}
		<div class="outline outline-2 -outline-offset-4 outline-yellow-500">
			<!-- <div class="pixi-app w-half aspect-[16/9] py-4"></div> -->
		</div>
	{/snippet}

	{#snippet scene()}
		<ScenesManager bind:this={SCM} scenes={scenes} bind:selectedSceneIndex={currentSceneIndex}></ScenesManager>
	{/snippet}
</PixiApp>
