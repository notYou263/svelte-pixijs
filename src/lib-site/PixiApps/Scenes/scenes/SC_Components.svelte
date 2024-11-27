<script>
	import { HTMLText, Text, Sprite, AnimatedSprite } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';

	/** Pixi Components */
	import Snake from '../../../PixiComps/Snake.svelte';
	import Ball from '../../../PixiComps/Ball.svelte';
	import Mesh from '../../../PixiComps/Mesh.svelte';
	import Plane from '../../../PixiComps/Plane.svelte';
	import NineSliceSprite from '../../../PixiComps/NineSliceSprite.svelte';

	const skewTextStyle = new PIXI.TextStyle({
		fontFamily: 'Arial',
		dropShadow: {
			alpha: 1.0,
			angle: 2.1,
			blur: 1,
			color: '0x174061',
			distance: 8,
            

		},
		fill: '#ffffff',
		stroke: { color: 0x1ea7e1, width: 10, join: 'round' },
		fontSize: 48,
		fontWeight: 'lighter'
	});

	const skewText = new PIXI.Text({
		text:  'Svelte ♥️ Pixi', // ' 8==✊🏻==D💦  \t ♥️', 
		style: skewTextStyle
	});

	skewText.skew.set(0.72, -0.4);
	skewText.anchor.set(0.5, 0.5);
</script>

<HTMLText
	x={32}
	y={64}
	text={`<strong>HTMLText</strong><hr /><span style="color: #84cc16"><em>Fancy Example Text</em></span>`}
	anchor={0.0}
	style={{
		align: 'center',
		fill: 'gold',
		padding: 4,
		fontSize: 18
		//letterSpacing: 12
	}}
></HTMLText>

<Text x={380} y={120} instance={skewText}></Text>

<Sprite
	x={570}
	y={180}
	texture={PIXI.Texture.from('eddie_face')}
    skew={{x: -0.0, y: -0.24}}
	anchor={0.5}
	scale={0.45}
/>
<Sprite
	x={320}
	y={520}
	texture={PIXI.Texture.from('/assets/laser/green_02.png')}
	anchor={0.5}
	scale={1.0}
/>
<Sprite
	x={360}
	y={600}
	texture={PIXI.Texture.from('/assets/laser/red_02.png')}
	anchor={0.5}
	scale={0.7}
/>

<AnimatedSprite
	x={480}
	y={520}
	textures={[
		PIXI.Texture.from('adventurer-idle-00.png'),
		PIXI.Texture.from('adventurer-idle-01.png'),
		PIXI.Texture.from('adventurer-idle-02.png')
	]}
	playing
	animationSpeed={0.1}
	anchor={0.5}
	scale={2}
/>

<Snake x={540} y={480}></Snake>

<Ball x={240} y={380} size={50} color={0x44d2b2}></Ball>
<Ball x={140} y={500} size={30} color={0xffb212}></Ball>

<Mesh></Mesh>

<Plane></Plane>

<NineSliceSprite></NineSliceSprite>
