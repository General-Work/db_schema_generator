<script lang="ts">
	interface Props {
		busy: boolean;
		text: string;
		handleSubmit: () => void;
	}
	let { busy = $bindable(false), text = $bindable(''), handleSubmit }: Props = $props();

	async function handleForm(event: any) {
		event.preventDefault();
		if (!text) return;

		handleSubmit();
	}
</script>

<form
	onsubmit={handleForm}
	class="flex h-full w-full items-center gap-2 rounded-[24px] border-[1px] border-[#E8ECEC] px-6 shadow"
>
	<input
		bind:value={text}
		placeholder="Ask anything"
		class="w-full resize-none outline-none placeholder:text-[16px] placeholder:font-light placeholder:text-[#7D8187]"
		disabled={busy}
	/>
	<button
		type="submit"
		aria-label="submit button"
		class="grid cursor-pointer place-content-center p-2.5 {!busy &&
			'rounded-full bg-black text-white'}"
	>
		<iconify-icon
			style="font-size: 20px;"
			icon={busy ? 'svg-spinners:3-dots-fade' : 'line-md:arrow-up'}
		></iconify-icon>
	</button>
</form>
