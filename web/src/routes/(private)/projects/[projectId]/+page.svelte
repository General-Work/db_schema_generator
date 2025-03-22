<script lang="ts">
	import { page } from '$app/state';
	import ChatEntry from '$cmps/chatEntry.svelte';
	import ChatInput from '$cmps/chatInput.svelte';
	import Schema from '$cmps/schema.svelte';
	import { activePage } from '$lib/data.svelte';
	import axiosInstance from '$lib/utils/axios.svelte';
	import { tick, onMount } from 'svelte';

	interface IMessage {
		content: string;
		isJson: boolean;
		jsonData: null | object;
		role: 'user' | 'assistant';
	}

	let projectId = $state('');
	let busy = $state(false);
	let messages = $state<IMessage[]>([]);
	let text = $state('');
	let container: HTMLDivElement;

	$effect(() => {
		projectId = page.params.projectId;
		load(projectId);
	});

	async function load(id: string) {
		try {
			const ret = await axiosInstance.config.get(`/projects/${id}`, { responseType: 'json' });
			if (ret.data) {
				const { conversations, name } = ret.data;
				messages = conversations.flatMap((conversation: any) => conversation.messages);
				activePage.setPage({ title: name.replace(/^"|"$/g, '') });
			}
		} catch (error) {
			console.log({ error });
		}
	}

	$effect.pre(() => {
		messages;
		const autoscroll =
			container && container.offsetHeight + container.scrollTop > container.scrollHeight - 50;

		if (autoscroll) {
			tick().then(() => {
				container.scrollTo(0, container.scrollHeight);
			});
		}
	});
	async function handleForm() {
		if (!text) return;

		try {
			busy = true;
			const ret = await axiosInstance.config.patch(`/projects/${projectId}`, { prompt: text });
			if (ret.data) {
				await load(projectId);
				text = '';
			}
		} catch (error) {
			console.log({ error });
		} finally {
			busy = false;
		}
	}
</script>

<div class="flex h-full w-full flex-col">
	<div
		class=" h-full w-full flex-grow items-center justify-center overflow-y-auto overflow-x-hidden pt-6"
		bind:this={container}
	>
		<div class="container mx-auto flex flex-col gap-[37px]">
			{#each messages as message}
				{#if !message.isJson}
					<div class="flex justify-center">
						<ChatEntry content={message.content} role={message.role} />
					</div>
				{:else}
					<div class="flex justify-center">
						<Schema schema={message.jsonData} />
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex h-60 items-center justify-center">
		<div class="mb-20 h-[80px] w-[800px]">
			<ChatInput bind:busy bind:text handleSubmit={handleForm} />
		</div>
	</div>
</div>
