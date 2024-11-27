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
	import Mesh from '../../PixiComps/Mesh.svelte';
	import Plane from '../../PixiComps/Plane.svelte';
	import NineSliceSprite from '../../PixiComps/NineSliceSprite.svelte';

	let { view, assets = [] } = $props();

	let app = $state();
	let wrapper = $state();
	let width = $state(1280);
	let height = $state(728);

	$effect(() => {
		if (app.instance) {
			initDevtools({ app: app.instance });
		}
	});

	//const spritesheet = PIXI.Assets.get('/assets/adventurer-spritesheet.json');
	//let textures = spritesheet.animations['adventurer-idle'];

	function changeAnimation() {
		// pick an an animation from the spritesheet at random
		const keys = Object.keys(spritesheet.animations);
		const randomIndex = Math.floor(Math.random() * keys.length);
		textures = spritesheet.animations[keys[randomIndex]];
	}

	function tick(ticker) {
	//	console.log(ticker.deltaTime)
	}
</script>

<!-- 
 bind:offsetWidth={width} bind:offsetHeight={height} 
-->

{#snippet viewFallback()}
	<div bind:this={wrapper}></div>
{/snippet}

{#if BROWSER}
	<Application bind:this={app} backgroundColor={0x151515} view={view ?? viewFallback} resizeTo={wrapper ?? window}>
		<AssetsLoader {assets} bundleName="PixiAppAssetsBundle">
			 
			<Container x={160} y={240}>
				<HTMLText
					x={0}
					y={0}
					text={`<strong>Hello</strong><hr /><em><strong>HTML</strong> World</em>`}
					anchor={0.5}
					style={{
						align: 'center',
						fill: 'gold',
						padding: 4,
						//letterSpacing: 12
					}}
				></HTMLText>
			</Container> 

			<!-- 
				<AnimatedSprite
					{textures}
					x={360}
					y={200}
					playing
					animationSpeed={0.1}
					anchor={0.5}
					scale={3}
					on:loop={changeAnimation}
				/>
				 -->
			<!-- 	 <Sprite
				 x={720}
				 y={240}
				 texture={PIXI.Texture.from('spiral_hole')}
				 anchor={0.5}
				 scale={0.5}
			   /> -->

			<Sprite
				x={320}
				y={520}
				texture={PIXI.Texture.from('/assets/laser/green_02.png')}
				anchor={0.5}
				scale={1}
			/>
			<Sprite
				x={360}
				y={600}
				texture={PIXI.Texture.from('/assets/laser/red_02.png')}
				anchor={0.5}
				scale={1}
			/>

			
			<Snake x={540} y={380}></Snake>

		
			<Ball x={240} y={380} size={50} color={0x44d2b2}></Ball>
			<Ball x={140} y={500} size={30} color={0xffb212}></Ball>
			<Mesh></Mesh>
			<Plane></Plane>
			<NineSliceSprite></NineSliceSprite>

			<Container x={196} y={80}>
				<Text text="Hello" x={0} y={0} anchor={0.5} style={{ fill: 'white' }} />
				<Text text="Text World" x={0} y={60} anchor={0.5} style={{ fill: 'cyan' }} />
			</Container>

			<AnimatedSprite
			x={480}
			y={520}
			textures={[
			  PIXI.Texture.from('adventurer-idle-00.png'),
			  PIXI.Texture.from('adventurer-idle-01.png'),
			  PIXI.Texture.from('adventurer-idle-02.png'),
			]}
			playing
			animationSpeed={0.1}
			anchor={0.5}
			scale={2}
		  />
			<Ticker ontick={tick} />
		</AssetsLoader>
	</Application>
{/if}
