<script module lang="ts">
  export interface RendererContext<T extends PIXI.Renderer | PIXI.IRenderer> {
    renderer: T
    invalidate: () => void
  }

  export function getRenderer<
    T extends PIXI.Renderer | PIXI.IRenderer,
  >(): RendererContext<T> {
    return getContext('pixi/renderer')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { getContext, onMount, setContext, type Snippet } from 'svelte'
  import { omitUndefined } from './util/helpers.js'

  type T = $$Generic<PIXI.Renderer | PIXI.IRenderer>
  type Props = Partial<Omit<PIXI.RendererOptions, 'view'>> & {
    instance?: T
    stage?: PIXI.Container

    view?: Snippet<void>
    children: Snippet<void>

    onprerender?: (ev: PIXI.FederatedEvent) => void
    onpostrender?: (ev: PIXI.FederatedEvent) => void
    oninvalidate?: () => void
  }

  const {
    width,
    height,
    useContextAlpha,
    autoDensity,
    antialias,
    preserveDrawingBuffer,
    premultipliedAlpha,
    resolution,
    forceCanvas,
    backgroundColor,
    backgroundAlpha,
    clearBeforeRender,
    powerPreference,
    eventMode,
    eventFeatures,
    view,
    children,
    onprerender,
    onpostrender,
    oninvalidate,
    instance: _instance,
  } = $props<Props>()

  export const instance =
    _instance ??
    (PIXI.autoDetectRenderer(
      omitUndefined({
        width,
        height,
        useContextAlpha,
        autoDensity,
        antialias,
        preserveDrawingBuffer,
        premultipliedAlpha,
        resolution,
        forceCanvas,
        backgroundColor,
        backgroundAlpha,
        clearBeforeRender,
        powerPreference,
        eventMode,
        eventFeatures,
      }),
    ) as T)

   // $inspect(instance)
  setContext('pixi/renderer', {
    renderer: instance,
    invalidate: () => {
      oninvalidate?.()
    },
  })

  function attachView(node: HTMLElement): void {
    if (!(instance.view.canvas instanceof HTMLElement)) {
      throw new Error(
        'PIXI.Renderer.view is not an HTMLElement, cannot append to node',
      )
    }

    if (node.childNodes.length) {
      node.childNodes[0].appendChild(instance.view.canvas)
    } else {
      node.appendChild(instance.view.canvas)
    }
  }

  onMount(() => {
    if (onprerender) instance.on('prerender', onprerender)
    if (onpostrender) instance.on('postrender', onpostrender)
  })
</script>

{#if view}
  <div use:attachView>
    {@render view()}
  </div>
{:else}
  <div use:attachView />
{/if}

{@render children()}
