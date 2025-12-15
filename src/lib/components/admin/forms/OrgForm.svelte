<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type {SuperValidated } from 'sveltekit-superforms';
	import type { NewOrg, UpdateOrg } from '$lib/server/db/schema';
	import { TextInput, SlugInput, SubmitButton } from '$lib/components/admin/ui';
	import { untrack } from 'svelte';
	
	interface Props {
		mode?: 'create' | 'update';
		formData: SuperValidated<NewOrg> | SuperValidated<UpdateOrg>;
	}
	
	let { mode = 'create', formData }: Props = $props();
	
	const { form, errors, enhance, constraints, message, delayed } = superForm(untrack(() => formData));
</script>

<div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
	<form use:enhance method="POST" class="flex flex-col gap-6 p-8">
		
		{#if $message}
			<div class="rounded-md p-4 text-sm  bg-red-500 text-white">
				{$message}
			</div>
		{/if}
		
		
		<TextInput
			type="text"
			id="name"
			name="name"
			bind:value={$form.name}
			error={$errors.name}
			{...$constraints.name}
			label="Organization Name"
		/>
		
			<SlugInput
				type="text"
				id="slug"
				name="slug"
				disabled={mode === 'update'}
				bind:value={$form.slug}
				error={$errors.slug}
				{...$constraints.slug}
				label="URL Slug"
			/>
		
		
		<SubmitButton
			loading={$delayed}
			label={ mode === 'create' ? 'Create Organization' : 'Update Organization' }
			loadingLabel={ mode === 'create' ? 'Creating Organization...' : 'Updating Organization...' }
		/>
	</form>
</div>
