<script lang="ts">
	import logo from '$lib/images/Vector.png';
	import avatar from '$lib/images/avatar.png';
	interface Props {
		user?: any | null;
		activePage: string;
		openProjects: boolean;
		toggleButton: () => void;
	}
	let { activePage = '', openProjects = false, toggleButton }: Props = $props();
</script>

<nav class="flex h-full items-center justify-between px-[40px]">
	<div class="flex items-center gap-1">
		<img src={logo} alt="logo" />
		<p class="  font-medium">KeyMap</p>
	</div>
	<div class="text-[16px] font-medium">
		{activePage}
	</div>
	<div class="flex items-center gap-5">
		<button
			onclick={toggleButton}
			class="grid cursor-pointer place-content-center hover:text-gray-500"
			aria-label={openProjects ? 'Close' : 'Search'}
		>
			<iconify-icon
				style="font-size: 18px;"
				icon={openProjects ? 'ic:sharp-close' : 'hugeicons:search-list-01'}
			></iconify-icon>
		</button>
		<img src={avatar} alt="avatar" class="h-[30px] w-[30px]" />
	</div>
</nav>
