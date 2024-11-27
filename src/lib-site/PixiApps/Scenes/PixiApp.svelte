<script>
	import { BROWSER } from 'esm-env'
	import * as PIXI from 'pixi.js';
	import { initDevtools } from '@pixi/devtools';

	import {
		Application,
		AssetsLoader,
		ParticleContainer,
		AnimatedSprite,
		Text,
		Container,
		HTMLText,
		Ticker,
		Sprite,
		MeshPlane
	} from 'svelte-pixijs';

	import Ball from '../../PixiComps/Ball.svelte';
	import Snake from '../../PixiComps/Snake.svelte';
	import { onMount } from 'svelte';

	let { view, scene, assets = [] } = $props();

	let app = $state();
	let wrapper = $state();

	$effect(() => {
		if (app.instance) {
			initDevtools({ app: app.instance });
		}
	});


	function tick(ticker) {
		//	console.log(ticker.deltaTime)
	}

	/* Keyboard Stuff */
	let keyboardLayoutMap

	onMount(async () => {
		if (navigator.keyboard) {
			const keyboard = navigator.keyboard;
			keyboardLayoutMap = await keyboard.getLayoutMap()
		} 
	})

	function onkeydown(evt){
		//evt.preventDefault()
		if(keyboardLayoutMap){
			const key = keyboardLayoutMap.get(evt?.code) ?? evt?.code;
			//console.log("PixiApp onkeydown", key, evt)
		}	
	}

</script>

<svelte:body onkeydown={onkeydown} />
<!-- 
 bind:offsetWidth={width} bind:offsetHeight={height} 
-->


{#snippet viewFallback()}
	<div bind:this={wrapper}></div>
{/snippet}

{#if BROWSER}
	<Application
		bind:this={app}
		antialias={true}
		backgroundColor={0x100d15}
		view={view ?? viewFallback}
		resizeTo={wrapper ?? window}
	
	>
		<AssetsLoader {assets} bundleName="PixiAppAssetsBundle">
			{@render scene?.()}
			<Ticker ontick={tick} />
		</AssetsLoader>
	</Application>
{/if}
