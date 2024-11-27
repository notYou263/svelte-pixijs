<script>
  import { MeshRope, onTick } from 'svelte-pixijs'
  import * as PIXI from 'pixi.js'

  let {x = 0, y = 0, ropeLength = 918 / 20 } = $props()


  let points = $state(Array.from({ length: 20 }).map((_, i) => ({
    x: i * ropeLength,
    y: 0,
  })))

  let time = 0
  onTick((ticker) => {
    time += 0.1 * ticker.deltaTime

    points = points.map((point, i) => ({
      x: i * ropeLength + Math.cos(i * 0.3 + time) * 20,
      y: Math.sin(i * 0.5 + time) * 30,
    }))
  })
</script>

<MeshRope
  x={280}
  y={360}
  texture={ PIXI.Texture.from('/assets/laser/green_02.png')}
  scale={0.6}
  {points}
/>