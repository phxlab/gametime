<script lang="ts">
	interface Props {
		label: string;
		loading?: boolean;
	}

	let { label, loading }: Props = $props();
</script>

<button
	type="submit"
	disabled={loading}
	class="flex w-full justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-4 text-sm font-bold text-white shadow-sm transition-all duration-200
  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
  dark:hover:bg-blue-500 dark:focus:ring-offset-gray-900"
>
	{#if loading}
		<svg
			class="mr-3 h-5 w-5 animate-spin text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
			></circle>
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
		Processing...
	{:else}
		{label}
	{/if}
</button>
