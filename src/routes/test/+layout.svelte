<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types.js';
	import '../../app.pcss';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<main class="pt-4">
	{@render children()}
</main>
