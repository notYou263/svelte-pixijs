<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'

  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PickPixiProps } from './util/data-types.js'
  import { createApplyProps } from './util/props.js'

  type T = $$Generic<PIXI.Sprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.Sprite,
      'anchor' | 'blendMode' | 'pluginName' | 'roundPixels' | 'tint',
      'texture'
    > & {
      instance?: T
    }

  const {
    anchor,
    blendMode,
    pluginName,
    roundPixels,
    tint,
    texture,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ?? new PIXI.Sprite(texture)) as T
  const { applyProp } = createApplyProps<PIXI.Sprite, Props>(instance, {
    onApply() {
      invalidate()
    },
  })
  const { invalidate } = getRenderer()

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('tint', tint))
  $effect(() => applyProp('texture', texture))
  $effect(() => {
    const inv = () => invalidate()
    if(texture)
      texture.on('update', () => invalidate())
    return () => {
      texture.off('update', inv)
    }
  })
</script>

<Container {...restProps} {instance} />
