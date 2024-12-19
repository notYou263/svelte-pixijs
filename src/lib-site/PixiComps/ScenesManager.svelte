<script>
	import { HTMLText } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';

	let { scenes = [], selectedSceneIndex = $bindable(0) } = $props();

	let _selected = $state(selectedSceneIndex);
	let Scene = $state({});


	$effect(() => {
		Scene = scenes[selectedSceneIndex];
	});

    export const nextScene = () => { 
        if(selectedSceneIndex < scenes.length - 1){
            selectedSceneIndex++
        }
        else {
            selectedSceneIndex = 0
        }
    }

    export const prevScene = () => { 
        if(selectedSceneIndex  > 0){
            selectedSceneIndex--
        }
        else {
            selectedSceneIndex = scenes.length - 1
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
