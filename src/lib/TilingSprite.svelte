<script lang="ts">
  /**
   * @restProps {Container}
   */

  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PickPixiProps } from './util/data-types.js'
  import { createApplyProps } from './util/props.js'

  type T = $$Generic<PIXI.TilingSprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.TilingSprite,
      | 'anchor'
      | 'blendMode'
      | 'tint'
      | 'clampMargin'
      | 'pluginName'
      | 'roundPixels'
      | 'tilePosition'
      | 'tileRotation'
      |  'tileScale'
      | 'tileTransform'
      | 'uvMatrix'
      | 'uvRespectAnchor',
      'height' | 'width'
    > & {
      texture: PIXI.Texture
      instance?: T
    }

  const {
    anchor,
    blendMode,
    tint,
    clampMargin,
    height,
    pluginName,
    roundPixels,
    texture,
    tilePosition,
    tileScale,
    tileRotation,
    tileTransform,
    uvMatrix,
    uvRespectAnchor,
    width,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.TilingSprite({texture, width, height})) as T

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.TilingSprite>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('tint', tint))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('clampMargin', clampMargin))
  $effect(() => applyProp('height', height))
  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('tilePosition', tilePosition))
  $effect(() => applyProp('tileRotation', tileRotation))
  $effect(() => applyProp('tileScale', tileScale))
  $effect(() => applyProp('tileTransform', tileTransform))
  $effect(() => applyProp('uvMatrix', uvMatrix))
  $effect(() => applyProp('uvRespectAnchor', uvRespectAnchor))
  $effect(() => applyProp('width', width))
  $effect(() => {
    texture.on('update', invalidate)
    return () => {
      texture.off('update', invalidate)
    }
  })
</script>

<Container {...restProps} {instance} {height} {width} />
