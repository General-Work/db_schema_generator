<script lang="ts">
	let { children } = $props();
</script>

<div class="h-screen w-screen">
	{@render children()}
</div>
