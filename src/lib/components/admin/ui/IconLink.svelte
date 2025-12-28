<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		children: Snippet;
	};

	const { children, href }: Props = $props();
</script>

<a
	{href}
	class="flex h-18 w-full flex-col items-center justify-center gap-1 rounded-lg border border-gray-300 text-gray-400 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 @xl/list:w-30 dark:border-gray-700 hover:dark:border-indigo-700 dark:hover:bg-indigo-950 hover:dark:text-indigo-300"
>
	{@render children()}
</a>
