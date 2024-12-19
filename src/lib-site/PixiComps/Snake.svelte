<script>
	import { MeshRope, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';
	import PointList from './Nodes/PointList.svelte';
	import Container from 'svelte-pixijs/Container.svelte';

	let { x = 0, y = 0, ropeLength = 600 / 10, debug = false,  ... restProps} = $props(); // snake length 918

	let points = $state(
		Array.from({ length: 10 }).map((_, i) => ({
			x: i * ropeLength,
			y: 0
		}))
	);

	let time = 0;
	onTick((ticker) => {
		time += 0.1 * ticker.deltaTime;
		/* 
		points = points.map((point, i) => ({
			x: i * ropeLength + Math.cos(i * 0.3 + time) * 16,
			y: Math.sin(i * 0.5 + time) * 32
		}));
     */
	});
</script>

<Container {x} {y} {... restProps}>
  <!--
   '/assets/snake.png' 
  -->
	<MeshRope texture={PIXI.Texture.from( '/assets/laser/green_02.png')}  {points}/> 

	<PointList  bind:points renderable={debug}></PointList>
  
</Container>
