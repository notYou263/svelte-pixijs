<script lang="ts">
    import type { PageData } from './$types.js';

    let { data }: { data: PageData } = $props();
</script>


<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class=" bg-neutral-950">
    <div class=" container mx-auto px-4 py-6">
       <!--  <div class="bg-blue-800  mx-auto  w-full max-w-[1280px] aspect-[16/9]">
        </div>     -->
        <iframe title="Basic Pixi.js Application" src="./apps/basic" class=" mx-auto  w-full max-w-[1280px] aspect-[16/9]"></iframe>
    </div>
</div>