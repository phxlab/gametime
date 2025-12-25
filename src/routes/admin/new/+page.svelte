<script lang="ts">
	import { OrgForm } from '$lib/components/admin/forms';
	import { resolve } from '$app/paths';
	import { BackArrow } from '$lib/components/icons';

	const { data } = $props();
</script>

<svelte:head>
	<title>Create Organization</title>
</svelte:head>

<div class="@container mt-5">
	<div class="mb-6">
		<a
			href={resolve('/admin')}
			class="group text-gray-500 transition-colors hover:text-gray-600 hover:dark:text-gray-400"
		>
			<div
				class="inline-block transition-transform duration-200 ease-out group-hover:-translate-x-1"
			>
				<BackArrow />
			</div>
			Back to Dashboard
		</a>
		<h1 class="text-2xl font-bold">Create Organization</h1>
	</div>

	<OrgForm formData={data.form} />
</div>
