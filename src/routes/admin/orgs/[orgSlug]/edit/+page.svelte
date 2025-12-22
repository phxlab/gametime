<script lang="ts">
	import { OrgForm, Page } from '$lib/components/admin/forms';

	const { data } = $props();
</script>

<Page
	previousPage="/admin"
	previousText="Back to Dashboard"
	title="Update Organization"
	subtitle="Update a client organization to the system"
>
	<OrgForm formData={data.form} />
</Page>
