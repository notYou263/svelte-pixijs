<script>
	import { MeshPlane, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';

	let { x = 0, y = 0, ropeLength = 918 / 20 } = $props();

	let plane = $state();
	let buffer = $state();
	let time = 0;

	$effect(() => {
		if (plane && plane?.instance?.geometry?.getBuffer('aPosition'))
			buffer = plane?.instance?.geometry?.getBuffer('aPosition');
	});

	onTick((ticker) => {

		if (buffer) {
			// Randomize the vertice positions a bit to create movement.
			for (let i = 0; i < buffer.data.length; i++) {
				buffer.data[i] += Math.sin(time / 10 + i) * 0.5;
			}
			buffer.update();
			time++;
		}
	});
</script>

<MeshPlane
	x={800}
	y={200}
	bind:this={plane}
	anchor={0.5}
	scale={0.5}
	texture={PIXI.Texture.from('/assets/bg_grass.jpg')}
	vertices={10}
/>
