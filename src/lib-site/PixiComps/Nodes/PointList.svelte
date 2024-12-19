<script>
	import { Container, Graphics, parsePoint, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';
	import Node from './Node.svelte';

	let {
		points = $bindable([]),
		nodeColors = {},
		draggable = false,
		drawLines = false,
		closePath = false,
		fillShape = false,
		nodeSnippet = undefined,
		children,
		... restProps
	} = $props();

	
	onTick((ticker) => {});

	const default_nodeColors = {
		fill: {
			color: 0xfafafa,
			hover: 0x8dfbdc,
			active: 0x4f88ff
		},

		stroke: {
			color: 0x626262,
			hover: 0x214a7d,
			active: 0xabddff
		}
	};

	let _nodeColors = $state({ ...default_nodeColors, ...nodeColors });

	function graphic_drawShape(graphic) {
		if (points.length < 2) return;

		const start = points[0];
		graphic.clear();
		graphic.moveTo(start.x, start.y)
		for(let i = 1; i < points.length; i++){
			// Draw lines between the points
			graphic.lineTo(points[i].x, points[i].y)
		}
		if(closePath)
		graphic.closePath()

		if(fillShape)
			graphic.fill({ color: 0xffaa00, alpha: 0.3 });

		if(drawLines)
			graphic.stroke({ color: 0x00ff00, pixelLine: true });
	
	}
</script>

{#snippet defaultNode(nodeIndex, { point = { x: 0, y: 0 }, ...restProps })}
	<Node
		x={point.x}
		y={point.y}
		size={12}
		{draggable}
		nodeColors={{ ...default_nodeColors, ...nodeColors }}
		{...restProps}
		bind:point={points[nodeIndex]}
	></Node>
{/snippet}

<Container {...restProps} >
	{@render children?.()}
	{#if drawLines || fillShape}
		<Graphics draw={graphic_drawShape}></Graphics>
	{/if}

	{#each points as point, i}
		{@render defaultNode(i, { point })}
	{/each}
</Container>
