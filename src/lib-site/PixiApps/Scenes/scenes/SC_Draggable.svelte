<script>
	import { Text } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';
	import PointList from '../../../PixiComps/Nodes/PointList.svelte';

	let points = $state([
		{ x: 400, y: 620 },
		{ x: 280, y: 550 },
		{ x: 320, y: 280 }
	]);

	let points2 = $state([
		{ x: 600, y: 660 },
		{ x: 980, y: 600 },
		{ x: 880, y: 380 }
	]);

	const nodeColors2 = {
		fill: {
			color: 0xf442d0,
			hover: 0x9f51ee,
			active: 0xc056ff
		},

		stroke: {
			color: 0x301848,
			hover: 0xcd9bdb,
			active: 0xf8b4ff
		}
	};

	let text = $state('');
	$effect(() => {
		text =
			'Path #1\n' +
			points.reduce((val, current, index) => {
				val += `#${index}: \t { x: ${current.x}, y: ${current.y} }\n\n`;
				return val;
			}, '') +
			'\n\nPath #2\n' +
			points2.reduce((val, current, index) => {
				val += `#${index}: \t { x: ${current.x}, y: ${current.y} }\n\n`;
				return val;
			}, '');

		// text = JSON.stringify($state.snapshot(points), null, 1 )
	});
</script>

<Text
	text={'Points'}
	x={32}
	y={64}
	style={{
		align: 'left',
		fill: '0xa0cdff',
		fontFamily: 'Arial',
		fontSize: 11,
		fontWeight: '600',
		letterSpacing: 2
	}}
></Text>

<Text
	{text}
	x={36}
	y={96}
	style={{
		align: 'left',
		fill: 'white',
		fontFamily: 'Monospace',
		fontSize: 10,
		letterSpacing: 2
	}}
></Text>

<PointList bind:points draggable={true} drawLines={false} fillShape></PointList>

<PointList bind:points={points2} draggable={true} nodeColors={nodeColors2}></PointList>
