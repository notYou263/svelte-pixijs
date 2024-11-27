<script>
	import { HTMLText } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';

	let { scenes = [], selected = 0 } = $props();

	let _selected = $state(selected);
	let Scene = $state({});


	$effect(() => {
		Scene = scenes[_selected];
	});

    export const nextScene = () => { 
        if(_selected < scenes.length - 1){
            _selected++
        }
        else {
            _selected = 0
        }
    }

    export const prevScene = () => { 
        if(_selected  > 0){
            _selected--
        }
        else {
            _selected = scenes.length - 1
        }
    }
</script>


<HTMLText text={`Scene <strong>'${Scene?.label}'</strong> `} 
 x={32}
 y={16}
 style={{
    align: 'left',
    fill: 'white',
    padding: 4,
    fontFamily: 'Monospace',
    fontSize: 11,
    fontStyle: 'italic',
 
}}></HTMLText>

<Scene.comp />
