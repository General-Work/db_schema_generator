<script lang="ts">
	import '../app.css';
	import 'iconify-icon';

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>
