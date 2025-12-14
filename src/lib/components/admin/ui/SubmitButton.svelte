<script lang="ts">
	interface Props {
		loading?: boolean;
		label: string;
		loadingLabel?: string;
	}
	
	let { loading = false, label, loadingLabel = 'Saving...' }: Props = $props();
</script>

<div class="border-t border-gray-100 pt-6 dark:border-gray-800">
	<button
		type="submit"
		disabled={loading}
		class="inline-flex cursor-pointer w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-indigo-500/25 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900 sm:w-auto"
	>
		{#if loading}
			<svg class="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			{loadingLabel}
		{:else}
			{label}
		{/if}
	</button>
</div>
