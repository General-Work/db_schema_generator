<script lang="ts">
	import { marked } from 'marked';
	interface Props {
		role: 'user' | 'assistant';
		content: string;
	}
	let { role, content }: Props = $props();
	let htmlContent = marked(content);
</script>

<div class="w-fit rounded-[16px] px-4 py-3 text-start {role === 'user' && 'bg-[#E8E8E880]'}">
	<div class=" text-[16px]">
		{@html htmlContent}
	</div>
</div>
