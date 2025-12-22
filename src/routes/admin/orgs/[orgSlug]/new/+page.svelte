<script lang="ts">
	import { Page, StoreForm } from '$lib/components/admin/forms';

	const { data } = $props();
</script>

<Page
	previousPage="/admin"
	previousText="Back to Dashboard"
	title="Create Store"
	subtitle="Add a new store for {data.currentOrg.name}"
>
	<StoreForm orgSlug={data.currentOrg.slug} formData={data.form} />
</Page>
