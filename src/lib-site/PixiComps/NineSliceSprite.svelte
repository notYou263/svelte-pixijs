<script>
	import { NineSliceSprite, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';


	
  let width = $state(80)
  let height = $state(60)
  let counter = 0

  onTick((ticker) => {
    counter += ticker.deltaTime * 0.04

    width = 80 + Math.cos(counter) * 20
    height = 60 + Math.sin(counter) * 20
  })
</script>

<NineSliceSprite
  x={940}
  y={500}
  texture={PIXI.Texture.from('/assets/nine-slice-blue.png')}
  leftWidth={12}
  topHeight={12}
  rightWidth={12}
  bottomHeight={12}
  {width}
  {height}
  pivot={{ x: width / 2, y: height / 2 }}
  scale={2}
/>