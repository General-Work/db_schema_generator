<script lang="ts">
	import { activePage } from '$lib/data.svelte';
	import axiosInstance from '$lib/utils/axios.svelte';
	import { onMount } from 'svelte';

	interface Props {
		onClick: () => void;
	}

	let { onClick }: Props = $props();

	let projects = $state<Array<{ id: string; name: string }>>([]);

	async function load() {
		try {
			const ret = await axiosInstance.config.get('/projects');
			if (ret.data) {
				projects = ret.data;
			}
		} catch (error) {
			console.log({ error });
		}
	}
	onMount(async () => {
		await load();
	});
</script>

<div class="flex h-full w-full flex-col">
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div
			class:hidden={Boolean(projects.length === 0)}
			class="flex h-full flex-grow flex-col items-center justify-center gap-[16px]"
		>
			{#each projects as { id, name }}
				<a href={`/projects/${id}`} onclick={onClick} class="text-[24px] hover:text-[#335CFF]"
					>{name.replace(/^"|"$/g, '')}</a
				>
			{/each}
		</div>
		<div class="h-30">
			<a
				onclick={() => {
					activePage.setPage({title: " "});
					onClick();
				}}
				class="flex h-[53px] w-[230px] items-center justify-center gap-[4px] rounded-full bg-black text-white hover:bg-gray-800"
				href="/projects"
			>
				<iconify-icon icon="line-md:plus" style="font-size: 25px;"></iconify-icon>
				<span>New Project</span>
			</a>
		</div>
	</div>
</div>
