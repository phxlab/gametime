<script lang="ts">
	const { children, enhance, message } = $props();
</script>

<div
	class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
>
	<form use:enhance method="POST" class="flex flex-col gap-6 p-8">
		{#if message}
			<div class="rounded-md bg-red-500 p-4 text-sm text-white">
				{message}
			</div>
		{/if}
		{@render children()}
	</form>
</div>
