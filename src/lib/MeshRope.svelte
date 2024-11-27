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

  type T = $$Generic<PIXI.SimpleRope>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.MeshRope,
      'geometry' | 'shader' | 'state' | 'drawMode',
      'texture'
    > & {
      instance?: T
      points: PointLike[]
      textureScale?: number
    }

  let {
    texture,
    points,
    geometry,
    shader,
    state,
    drawMode,
    textureScale = 0,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.MeshRope({texture, points: parsePoints(points), textureScale})) as T

  function parsePoints(points: PointLike[]): PIXI.Point[] {
    return points.map(parsePoint)
  }

  const { applyProp } = createApplyProps<PIXI.MeshRope, Props>(instance, {
    onApply() {
      invalidate()
    },
    apply: {
      // PIXI.SimpleRope only uses points to create the geometry on construction,
      // so we need to recreate it whenever points change
      points: (value, instance) => {
        instance.geometry = new PIXI.RopeGeometry({
          width: texture.height,
          points: parsePoints(value),
          textureScale,
      }  )
      },
    },
  })
  const { invalidate } = getRenderer()

  $effect(() => applyProp('geometry', geometry))
  $effect(() => applyProp('shader', shader))
  $effect(() => applyProp('state', state))
  $effect(() => applyProp('drawMode', drawMode))
  $effect(() => applyProp('texture', texture))
  $effect(() => applyProp('points', points))

  $effect(() => {
    if(texture.source)
      texture?.source.on('update', invalidate)
    return () => {
      texture.source.off('update', invalidate)
    }
  })
</script>

<Container {...restProps} {instance} />