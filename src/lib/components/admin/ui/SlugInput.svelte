<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { slugify, toSlug } from '$lib/utils';
	
	interface Props extends HTMLInputAttributes {
		label: string;
		error?: string[] | undefined;
		helperText?: string;
	}
	
	let {
		label,
		error,
		helperText,
		value = $bindable(),
		class: className,
		...rest
	}: Props = $props();
	
	const handleSlugInput = () => {
		value = toSlug(value);
	}
	
	const handleSlugify = () => {
		value = slugify(value);
	}
</script>

<div class="space-y-2">
	<label for={rest.id || rest.name} class="block text-sm font-semibold text-gray-900 dark:text-gray-200">
		{label}
	</label>
	<div class="relative rounded-xl shadow-sm">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<span class="text-gray-500 sm:text-sm">/shop/</span>
		</div>
		<input
			bind:value
			oninput={handleSlugInput}
			onfocusout={handleSlugify}
			{...rest}
			class="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-16 pr-3 text-base placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-600 dark:focus:border-indigo-500 dark:disabled:bg-gray-900 dark:disabled:text-gray-500 {className}"
			aria-invalid={error ? 'true' : undefined}
		/>
	</div>
	
	{#if error}
		<p class="text-sm font-medium text-red-500">{error}</p>
	{:else if helperText}
		<p class="text-xs text-gray-500 dark:text-gray-400">
			{helperText}
		</p>
	{/if}
</div>
