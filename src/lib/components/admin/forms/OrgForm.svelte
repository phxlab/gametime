<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { CreateOrg } from '$lib/server/contracts';
	import { TextInput, SlugInput, SubmitButton } from '$lib/components/admin/ui';
	import { untrack } from 'svelte';
	import Form from './Form.svelte';

	interface Props {
		mode?: 'create' | 'update';
		formData: SuperValidated<CreateOrg>;
	}

	let { mode = 'create', formData }: Props = $props();

	const { form, errors, enhance, constraints, message, delayed } = superForm(
		untrack(() => formData)
	);
</script>

<Form {enhance} message={$message}>
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
		label={mode === 'create' ? 'Create Organization' : 'Update Organization'}
		loadingLabel={mode === 'create' ? 'Creating Organization...' : 'Updating Organization...'}
	/>
</Form>
