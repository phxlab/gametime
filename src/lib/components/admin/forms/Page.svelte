<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		previousPage: string;
		previousText: string;
		title: string;
		subtitle: string;
	};

	const { children, previousPage, previousText, title, subtitle }: Props = $props();
</script>

<div class="mx-auto max-w-2xl space-y-8 p-6">
	<div class="space-y-2">
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={previousPage}
			class="inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
		>
			<svg
				class="mr-1 h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			{previousText}
		</a>
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
			{title}
		</h1>
		<p class="text-gray-500 dark:text-gray-400">{subtitle}</p>
	</div>

	{@render children()}
</div>
