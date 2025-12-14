<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	
	interface Props extends HTMLInputAttributes {
		label: string;
		error?: string[] | undefined;
	}
	
	let { label, error, value = $bindable(), class: className, ...rest }: Props = $props();
</script>

<div class="space-y-2">
	<label for={rest.id || rest.name} class="block text-sm font-semibold text-gray-900 dark:text-gray-200">
		{label}
	</label>
	<input
		bind:value
		{...rest}
		class="block w-full rounded-xl border border-gray-300 bg-white p-3 text-base placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-600 dark:focus:border-indigo-500 dark:disabled:bg-gray-900 dark:disabled:text-gray-500 {className}"
		aria-invalid={error ? 'true' : undefined}
	/>
	{#if error}
		<p class="text-sm font-medium text-red-500">{error}</p>
	{/if}
</div>
