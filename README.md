# svelte-pixijs
 A fork of https://github.com/mattjennings/svelte-pixi updated for use with PixiJS v8

Check their [Documentation](https://svelte-pixi-4d6qmvkc6-mattjennings.vercel.app/getting-started/usage/) for usage. 

See changes below 

## Installation

You just need to install the following dependencies:

```bash
npm install pixi.js svelte-pixijs
```

### changes

- onTick callback receives a Pixi Ticker now. For delta time use `ticker.deltaTime`
- Some components are renamed.
  - SimpleRope -> MeshRope
  - SimplePlane -> MeshPlane
  - NineSlicePlane -> NineSliceSprite
- There are few key changes to PixiJS Graphics API. See [PixiJS v8 Migration Guide](https://pixijs.com/8.x/guides/migrations/v8#graphics-api-overhaul) for details.

## v 0.0.3

- TilingSprite - Added `tileScale` and `tileRotation` props
- New Component `PerspectiveMesh`. [PixiJS Docs - PerspectiveMesh](https://pixijs.download/release/docs/scene.PerspectiveMesh.html)


  #### PerspectiveMesh Props
  | Name | Description |
  | ------  | --------- |
  | texture | The texture to use  |
  | vertices | `PointLike` The number of vertices in the plane. `{ x: 10, y: 10 }`
  | corners |  `PointLike []` Position for each corner `[{ x: 0, y: 0 }, { x: 100, y: 0 }, /*...*/ }]` |
  
