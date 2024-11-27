<script>
	import { Graphics, getStage, getApp, parsePoint } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';

	let {
		x = 0,
		y = 0,
        size = 16,
        strokeWidth = 2,
		colors: _colors = { },
        point = $bindable(parsePoint({x,y}))
	} = $props();

    const { app } = getApp()
    const { stage } = getStage()
   
    const default_colors = {
        
			fill: {
				color: 0xfafafa,
				hover: 0x8dfbdc,
				active: 0x4f88ff
			},

			stroke: {
				color: 0x626262,
				hover: 0x214a7d,
				active: 0xabddff
			}
    }

    let colors = { 
        ... default_colors,
        ... _colors
    }

    let fillColor = $state(colors?.fill?.color ?? 0xffffff);
	let strokeColor = $state(colors?.stroke?.color ?? 0x303030);
	
    let dragTarget

   // export const point = parsePoint({x,y})

    onMount(() => {
        
        stage.eventMode = 'static';
        stage.hitArea = app.screen
        stage.on('pointerup', onPointerUp);
        stage.on('pointerupoutside', onPointerUp);

        return () => {
         stage.off('pointerup', onPointerUp);
         stage.off('pointerupoutside', onPointerUp);
        
        }
    })
    
	function onPointerOver(evt){
		fillColor = colors?.fill?.hover
		strokeColor = colors?.stroke?.hover
		//this.colors = { fillColor: default_colors.fill.active, strokeColor: default_colors.stroke.hover } 
	}

	function onPointerOut(evt){
		fillColor = colors?.fill?.color
		strokeColor = colors?.stroke?.color
	}

    function onPointerDown(evt){
		fillColor = colors?.fill?.active
		strokeColor = colors?.stroke?.active

        //dragTarget = this
        stage.on('pointermove', onPointerMove)
	}

    function onPointerUp(evt){
        if(dragTarget){
            stage.off('pointermove', onPointerMove)
            //dragTarget = null
        }
    }
    function onPointerMove(evt)
    {
        if (dragTarget)
        {
            dragTarget.instance.parent.toLocal(evt.global, null, dragTarget.instance.position);

            //update point prop position
            point.x = dragTarget.instance.position.x
            point.y =  dragTarget.instance.position.y 
        }
    }

</script>

<Graphics
    bind:this={dragTarget}
		{x}
		{y}
		eventMode={'static'}
		cursor={'grab'}
		roundPixels={true}
		onpointerover={onPointerOver}
		onpointerout={onPointerOut}
        onpointerdown={onPointerDown}
        onpointerup={onPointerUp}
		draw={function (graphics) {
			   console.log("Node graphic draw")
			graphics.clear();
			// graphics.beginFill(color)
			graphics
				.circle(0, 0, size)
				.fill(fillColor)
				.stroke({ color: strokeColor, width: strokeWidth, cap: 'round' });
		}}
	></Graphics>