<script lang="ts">
  import type { PickPixiProps } from './util/data-types.js'

  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { createApplyProps } from './util/props.js'

  type T = $$Generic<PIXI.NineSliceSprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.NineSliceSprite,
      | 'leftWidth'
      | 'rightWidth'
      | 'topHeight'
      | 'bottomHeight'
      | 'state'
      | 'geometry'
      | 'drawMode',
      | 'tint',
      'texture'
    > & {
      instance?: T
      shader?: PIXI.MeshMaterial | PIXI.Shader
    }

  const {
    texture,
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
    shader,
    state,
    drawMode,
    tint,
    geometry,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance: T = (_instance ??
    new PIXI.NineSliceSprite({
      texture,
      leftWidth,
      topHeight,
      rightWidth,
      bottomHeight,
    })) as T

  const { invalidate } = getRenderer()

  const { applyProps, applyProp } = createApplyProps<
    PIXI.NineSlicePlane,
    Props
  >(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('drawMode', drawMode))
  $effect(() => applyProp('tint', tint))
  $effect(() => applyProp('texture', texture))

  $effect(() =>
    applyProps({
      leftWidth,
      rightWidth,
      topHeight,
      bottomHeight,
    }),
  )

  $effect(() => {
    texture.on('update', invalidate)
    return () => {
      texture.off('update', invalidate)
    }
  })
</script>

<Container {...restProps} {instance} />
