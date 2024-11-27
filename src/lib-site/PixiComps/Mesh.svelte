<script>
	import { Mesh, onTick } from 'svelte-pixijs';
	import * as PIXI from 'pixi.js';

	let rotation = $state(0);

	const texture = PIXI.Texture.from('/assets/bg_mesh.jpg');

	const geometry = new PIXI.Geometry({
		attributes: {
			aPosition: [
				-100,
				-100, // x, y
				100,
				-100, // x, y
				100,
				100, // x, y,
				-100,
				100 // x, y,
			],
			aUV: [0, 0, 1, 0, 1, 1, 0, 1],
			aColor: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1]
		},
		indexBuffer: [0, 1, 2, 0, 2, 3]
	});

	const vertexSrc = `
in vec2 aPosition;
in vec3 aColor;
in vec2 aUV;

out vec3 vColor;
out vec2 vUV;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;

uniform mat3 uTransformMatrix;


void main() {

    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vColor = aColor;
    vUV = aUV;
}`;

	const fragmentSrc = `
in vec3 vColor;
in vec2 vUV;

uniform sampler2D uTexture;

void main() {
    gl_FragColor = texture2D(uTexture, vUV) * vec4(vColor, 1.0);
}`;

	const glProgram = PIXI.GlProgram.from({ vertex: vertexSrc, fragment: fragmentSrc });
	const shader = new PIXI.Shader({
		glProgram,
		resources: {
			uTexture: texture.source,
		}
	});

	onTick((ticker) => {
		rotation += 0.01 * ticker.deltaTime;
		shader.resources.time += 0.1 * ticker.deltaTime;
	});

	//const _mesh = new PIXI.Mesh({ geometry, shader })
</script>

<Mesh x={740} y={100} anchor={0.5} scale={0.8} {geometry} {shader} {rotation} />
