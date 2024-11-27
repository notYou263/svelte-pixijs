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