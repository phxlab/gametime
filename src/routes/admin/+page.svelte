<script lang="ts">
	import { resolve } from '$app/paths';
	import { Add, Company, Search } from '$lib/components/icons';

	const { data } = $props();
</script>

<svelte:head>
	<title>Organizations</title>
</svelte:head>

<div class="@container">
	<!-- Page Header -->
	<div class="mt-5 flex flex-col justify-between gap-4 @lg:flex-row">
		<h1 class="text-2xl font-bold">Organizations</h1>
		<a href={resolve('/admin/new')} class="btn w-full @md:w-auto">
			<Add class="mr-2 text-xl" />
			Create Organization
		</a>
	</div>

	<!-- Search Bar -->
	<div class="relative my-8 w-full @lg:w-md">
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<Search class="mr-2 text-xl" />
		</div>
		<input
			type="text"
			class="w-full rounded-xl border-0 bg-white py-3 pl-10 text-base shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-0 focus:ring-inset dark:bg-gray-900 dark:text-white dark:ring-gray-800"
			placeholder="Search organizations..."
		/>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<!-- Organizations List -->
		{#each data.orgs as org (org.id)}
			<a
				href={resolve(`/admin/orgs/${org.slug}`)}
				class="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 hover:border-{org.color}-500"
			>
				<div class="p-6">
					<!-- Top Section -->
					<div class="flex items-start justify-between">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-{org.color}-500/20 text-xl font-bold text-{org.color}-500 capitalize"
						>
							{org.name[0]}
						</div>

						<span
							class="inline-flex items-center rounded-lg bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring ring-gray-500/10 ring-inset dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700"
						>
							<Company class="mr-1" />
							{org.stores.length}
							{org.stores.length === 1 ? 'store' : 'stores'}
						</span>
					</div>

					<!-- Bottom Section -->
					<div class="mt-6">
						<h3
							class="truncate text-lg font-bold transition-colors group-hover:text-{org.color}-500"
						>
							{org.name}
						</h3>
						<p class="mt-1 font-mono text-xs text-gray-500">/shop/{org.slug}</p>
					</div>
				</div>
				<div
					class="h-1 w-full bg-gray-50 transition-colors duration-300 group-hover:bg-{org.color}-500 dark:bg-gray-800"
				></div>
			</a>
		{/each}
	</div>
</div>
