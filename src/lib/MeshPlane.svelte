<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import {
    parsePoint,
    type PickPixiProps,
    type PointLike,
  } from './util/data-types.js'
  import { createApplyProps } from './util/props.js'

  type T = $$Generic<PIXI.MeshPlane>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.MeshPlane,
      'geometry' | 'shader' | 'state' | 'drawMode',
      'texture'
    > & {
      instance?: T
      vertices: PointLike
    }

  const {
    texture,
    vertices,
    geometry,
    shader,
    state,
    drawMode,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.MeshPlane({
      texture,
      verticesX: parsePoint(vertices).x,
      verticesY: parsePoint(vertices).y,
    })) as T

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<PIXI.MeshPlane>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('drawMode', drawMode))
  $effect(() => applyProp('texture', texture))

  $effect(() => {
    texture.on('update', invalidate)
    return () => {
      texture.off('update', invalidate)
    }
  })
</script>

<Container {instance} {...restProps} />
