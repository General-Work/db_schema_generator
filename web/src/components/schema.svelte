<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		schema: any;
	}
	let { schema }: Props = $props();

	let tables = $state<any[]>([]);
	let relationships = $state<any[]>([]);
	function generateERD() {
		const isNewFormat = schema.tables !== undefined;

		// Extract tables
		tables = (isNewFormat ? schema.tables : schema).map((table) => {
			return {
				name: table.name,
				columns: table.columns.map((column) => ({
					columnName: column.name,
					type: column.type,
					primary_key: column.primary_key || false,
					foreign_key: column.foreign_key || null
				}))
			};
		});

		// Extract relationships
		// const relationships = [];
		tables.forEach((table) => {
			table.columns.forEach((column) => {
				if (column.foreign_key) {
					const [refTable] = column.foreign_key.match(/(\w+)\(/) || [];
					relationships.push({
						from: table.name,
						column: column.columnName,
						to: refTable
					});
				}
			});
		});
	}

	onMount(() => generateERD());

	// $effect(() => generateERD());
</script>

<div class="flex flex-wrap justify-center gap-[20px]">
	{#each tables as table}
		<div class="h-fit border-[1px] border-[#E1E4EA] text-[14px]">
			<div
				class="border-[1px] border-[#E1E4EA] bg-[#F3F3F3] p-[5px] px-[12px] text-[16px] font-medium"
			>
				{table.name}
			</div>
			{#each table.columns as column}
				<div class="field min-w-62 flex justify-between gap-4 antialiased">
					<p>{column.columnName}</p>
					<p>{column.type}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.field {
		border-bottom: 1px solid #ddd;
		padding: 5px;
	}
</style>
