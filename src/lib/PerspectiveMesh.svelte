<script lang="ts">
	/**
	 * @restProps {Container}
	 */
	import * as PIXI from 'pixi.js';
	import Container from './Container.svelte';
	import { getRenderer } from './Renderer.svelte';
	import { parsePoint, type PickPixiProps, type PointLike } from './util/data-types.js';
	import { createApplyProps } from './util/props.js';

	type T = $$Generic<PIXI.PerspectiveMesh>;
	type Props = Container<T>['$$prop_def'] &
		PickPixiProps<PIXI.PerspectiveMesh, 'texture'> & {
			instance?: T;
			vertices: PointLike;
			corners: PointLike[];
		};

	const { texture, vertices, corners, instance: _instance, ...restProps } = $props<Props>();

	export const instance = (_instance ??
		new PIXI.PerspectiveMesh({
			texture,
			verticesX: parsePoint(vertices).x,
			verticesY: parsePoint(vertices).y,

		})) as T;

	function parsePoints(points: PointLike[]): PIXI.Point[] {
		return points.map(parsePoint);
	}

	function parseCorners(corners: PointLike[]): any[] {
		return corners.reduce((current: PointLike[], v: PointLike) => {
			current.push(parsePoint(v).x, parsePoint(v).y);
			return current;
		}, []);
	}

	const { invalidate } = getRenderer();

	const { applyProp } = createApplyProps<PIXI.PerspectiveMesh>(instance, {
		onApply() {
			invalidate();
		},
		apply: {
			// PIXI.SimpleRope only uses points to create the geometry on construction,
			// so we need to recreate it whenever points change
			corners: (value, instance) => {
				instance.setCorners(...parseCorners(value));
			}
		}
	});

	$effect(() => applyProp('corners', corners));

	$effect(() => applyProp('texture', texture));

	$effect(() => {
		texture.on('update', invalidate);
		return () => {
			texture.off('update', invalidate);
		};
	});
</script>

<Container {instance} {...restProps} />
