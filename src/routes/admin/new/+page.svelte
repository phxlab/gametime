<script lang="ts">
	import { resolve } from '$app/paths';
	import { OrgForm } from '$lib/components/admin/forms';
	
	const { data } = $props()
</script>

<div class="mx-auto max-w-2xl space-y-8 p-6">
	<div class="space-y-2">
		<a
			href={resolve('/admin')}
			class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
		>
			<svg class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Back to Dashboard
		</a>
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
			Create Organization
		</h1>
		<p class="text-gray-500 dark:text-gray-400">Add a new client organization to the system.</p>
	</div>
	
	<OrgForm formData={data.form} />
</div>
