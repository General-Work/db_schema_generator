<script lang="ts">
	import ChatInput from '$cmps/chatInput.svelte';
	import ProjectList from '$cmps/projectList.svelte';
	import Topbar from '$cmps/topbar.svelte';
	import { activePage } from '$lib/data.svelte';

	let { children } = $props();
	let openProjects = $state(false);
	function toggleButton() {
		openProjects = !openProjects;
	}
</script>

<div class="h-screen w-screen overflow-hidden">
	<div class="flex h-full w-full flex-col">
		<div class="h-[80px] border-b-[1px] border-[#E8ECEC]">
			<Topbar activePage={activePage.title} {openProjects} {toggleButton} />
		</div>
		{#if openProjects}
			<div class="flex-grow">
				<ProjectList onClick={toggleButton} />
			</div>
		{:else}
			<div class=" h-full w-full flex-grow">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
