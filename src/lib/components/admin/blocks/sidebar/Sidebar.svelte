<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { clickOutside } from '$lib/utils';
	// Assume you have your ThemeToggle, etc., imported here
	// import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	// ... let { children } = $props(); (Svelte 5)
	let open = $state(false);
</script>

<div
	class="min-h-screen bg-gray-50
    font-sans text-gray-900
    dark:bg-gray-950 dark:text-gray-100"
>
	<aside
		class="
      fixed top-0 left-0 z-10 h-full w-60 space-y-6 border-r
      border-gray-100 bg-white p-4 shadow-xl
      transition-colors dark:border-r dark:border-gray-700 dark:bg-gray-800"
	>
		<div
			use:clickOutside={() => {
				if (open) open = false;
			}}
			class="relative"
		>
			<button
				onclick={() => (open = !open)}
				class="flex w-full cursor-pointer items-center justify-between rounded-md border p-2 text-left text-sm dark:border-gray-100/20 dark:bg-gray-900 dark:text-white"
			>
				Organization Name
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8 10l4-4 4 4" />
					<path stroke-linecap="round" stroke-linejoin="round" d="M8 14l4 4 4-4" />
				</svg>
			</button>

			{#if open}
				<Dropdown />
			{/if}
		</div>

		<nav class="space-y-1">
			<a
				href="/admin/dashboard"
				class="flex items-center space-x-3 rounded-lg px-3 py-2
          transition-colors duration-150
          hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
				<span>Dashboard</span>
			</a>
		</nav>

		<div class="absolute bottom-4 w-full pr-8"></div>
	</aside>

	<main class="ml-64 p-8">
		<slot />
	</main>
</div>
