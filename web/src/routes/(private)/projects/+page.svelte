<script lang="ts">
	import { goto } from '$app/navigation';
	import ChatInput from '$cmps/chatInput.svelte';
	import { activePage } from '$lib/data.svelte';
	import axiosInstance from '$lib/utils/axios.svelte';
	let busy = $state(false);
	let text = $state('');

	activePage.setPage({ title: ' ' });

	async function handleForm() {
		if (!text) return;

		try {
			busy = true;
			const ret = await axiosInstance.config.post('/projects', { prompt: text });
			// console.log({ ret });
			if (ret.data) {
				goto(`/projects/${ret.data.id}`);
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
	<div class="flex-grow">
		<div class="flex h-full w-full items-center justify-center">
			<div class="flex flex-col text-center text-[36px]">
				<p class="">
					<span>Welcome</span>,
					<span class=" italic">User.</span>
				</p>
				<p class="text-[#7D8187]">What are we building today?</p>
			</div>
		</div>
	</div>
	<div class="flex items-center justify-center pb-10">
		<div class="h-[80px] w-[800px]">
			<ChatInput bind:busy bind:text handleSubmit={handleForm} />
		</div>
	</div>
</div>
