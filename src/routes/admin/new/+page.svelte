<script lang="ts">
	import { OrgForm, Page } from '$lib/components/admin/forms';

	const { data } = $props();
</script>

<Page
	previousPage="/admin"
	previousText="Back to Dashboard"
	title="Create Organization"
	subtitle="Add a new client organization to the system"
>
	<OrgForm formData={data.form} />
</Page>
