<script>
	import { TilingSprite, AssetsLoader, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';

	let count = $state(0);
	let scale = $state({ x: 1, y: 1 });
	let tilePosition = $state({ x: 0, y: 0 });

	onTick((ticker) => {
		count += 0.01 * ticker.deltaTime;

		//scale = { x: 2 + Math.sin(count), y: 2 + Math.cos(count) };
		tilePosition = { x: tilePosition.x + 1, y: tilePosition.y + 1 };
	});
	
</script>

<TilingSprite
  x={560}
  y={400}
  texture={PIXI.Texture.from('tiling_sprite')}
  anchor={0.5}
  width={300}
  height={120}
  tileScale={{x: 0.4, y: 0.2} }
  tileRotation={3.2}
  {tilePosition}
  {scale}
/>