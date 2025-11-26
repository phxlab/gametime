<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4 dark:from-gray-900 dark:to-gray-800"
>
	{@render children()}
</div>
