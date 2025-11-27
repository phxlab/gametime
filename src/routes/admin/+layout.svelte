<script lang="ts">
	import { Sidebar } from '$lib/components/admin/blocks';

	let { children } = $props();
</script>

<Sidebar />
{@render children()}
