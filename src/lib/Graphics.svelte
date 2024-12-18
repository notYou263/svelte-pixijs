<script lang="ts">
  import type { PickPixiProps } from './util/data-types.js'

  import { createApplyProps } from './util/props.js'

  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'

  type T = $$Generic<PIXI.Graphics>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.Graphics,
      'blendMode' | 'pluginName' | 'tint' | 'geometry'
    > & {
      instance?: T
      draw?: (graphics: PIXI.Graphics) => any
    }

  const {
    draw,
    blendMode,
    pluginName,
    roundPixels,
    tint,
    geometry,
    children,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ?? new PIXI.Graphics(geometry)) as T

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.Graphics>(instance as T, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('tint', tint))
  $effect(() => applyProp('roundPixels', roundPixels))

  $effect(() => {
    if (draw) {
      draw(instance as T)
    }
  })
</script>

<Container {...restProps} {instance} {children} />
