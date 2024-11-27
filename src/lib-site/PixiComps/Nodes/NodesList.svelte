<script>
	import { Container, Graphics, parsePoint, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';
	import Node from './Node.svelte';

	let { points = $bindable([]), drawLines = false, nodeGraphics = undefined } = $props();

	let _points = points.map( (v) => parsePoint(v))
	$effect(() => {});

	onTick((ticker) => {});

	const nodeOpts = {
		x: 0,
		y: 0,
		colors: {
			fill: {
				color: 0xde2200,
				hover: 'gold',
				active: 'skyblue'
			},
			stroke: {
				color: 0x626262,
				hover: 0x214a7d,
				active: 0xabddff
			}
		}
	};
</script>

{#snippet defaultNodeGraphics(nodeIndex, { x = 0, y = 0, ... restProps })}
	<Node {x} {y} size={12} {...restProps} bind:point={points[nodeIndex]}></Node>
{/snippet}

<Container>
	{#each _points as p,i }
		{@render defaultNodeGraphics( i , { x: p.x, y: p.y })}

	{/each}
	
	
</Container>
