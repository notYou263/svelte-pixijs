<script>
    import { onMount } from 'svelte'
    import { Graphics, onTick } from 'svelte-pixijs'

    let counter = 0
  
    let {x = 0, y = 0, size = 100, color = 0xde3249 } = $props()
    let _size = $state(size)

    onTick((ticker) => {
      if(counter == 0)
        console.log("Ball.svelte onTick, counter: ", ticker)
      counter += ticker.deltaTime * 0.025
  
      _size = size + Math.sin(counter) * (50/2)
    })
  </script>
  
  <Graphics
    x={x}
    y={y}
    draw={(graphics) => {
     //   console.log("Ball.svelte draw")
      graphics.clear()
     // graphics.beginFill(color)
      graphics.circle(0, 0, _size).fill(color)
 
    }}
  />