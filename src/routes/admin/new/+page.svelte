<script lang="ts">
	import { OrgForm } from '$lib/components/admin/forms';
	import { Back } from '$lib/components/admin/ui';

	const { data } = $props();
</script>

<svelte:head>
	<title>Create Organization</title>
</svelte:head>

<div class="@container mt-5">
	<div class="mb-6">
		<Back title="Back to Dashboard" href="/admin" />
		<h1 class="text-xl font-bold">Create Organization</h1>
	</div>

	<OrgForm formData={data.form} />
</div>
