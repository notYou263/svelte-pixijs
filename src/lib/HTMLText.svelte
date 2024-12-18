<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { createApplyProps } from './util/props.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PickPixiProps } from './util/data-types.js'

  type T = $$Generic<PIXI.HTMLText>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.HTMLText,
      'anchor' | 'blendMode' | 'pluginName' | 'roundPixels',
      'text'
    > & {
      instance?: T
      style?: PIXI.IHTMLTextStyle
    }

  const {
    anchor,
    blendMode,
    pluginName,
    roundPixels,
    text,
    style,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.HTMLText({text, style })) as T

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.HTMLText>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('text', text))
  $effect(() => applyProp('style', style))
  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('roundPixels', roundPixels))
</script>

<Container {...restProps} {instance} />
