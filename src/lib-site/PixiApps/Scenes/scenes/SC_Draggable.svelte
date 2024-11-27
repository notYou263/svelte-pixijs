<script>
	import { Text } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';
	import NodesList from '../../../PixiComps/Nodes/NodesList.svelte';

	let points = $state([
		{ x: 400, y: 620 },
		{ x: 280, y: 550 },
		{ x: 320, y: 280 }
	]);

    let text = $state('')
    $effect(() => {
    
       text = points.reduce((val, current, index) => { 
            val += `#${index}: \t { x: ${current.x}, y: ${current.y} }\n\n`
            return val
        }, "")
       // text = JSON.stringify($state.snapshot(points), null, 1 )
    })
</script>



<Text text={"Points"} x={32} y={64} style={{
    align: 'left',
    fill: '0xa0cdff',
    fontFamily: 'Arial',    
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2
 
}}></Text>

<Text text={text} x={36} y={96} style={{
    align: 'left',
    fill: 'white',
    fontFamily: 'Monospace',    
    fontSize: 10,
    letterSpacing: 2
 
}}></Text>


<NodesList bind:points></NodesList>
