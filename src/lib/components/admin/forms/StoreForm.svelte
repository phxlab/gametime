<script lang="ts">
	import Form from './Form.svelte';
	import { SlugInput, TextInput } from '$lib/components/admin/ui';
	import ColorPicker from '$lib/components/admin/forms/ColorPicker.svelte';
	import Shipping from '$lib/components/admin/forms/Shipping.svelte';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import type { CreateOrg } from '$lib/server/contracts';
	import { untrack } from 'svelte';

	interface Props {
		formData: SuperValidated<CreateOrg>;
		orgSlug: string;
	}

	let { formData, orgSlug }: Props = $props();

	const { form, errors, enhance, constraints, message, delayed } = superForm(
		untrack(() => formData)
	);
</script>

<Form {enhance} message={$message}>
	<TextInput
		type="text"
		id="name"
		name="name"
		label="Store Name"
		bind:value={$form.name}
		error={$errors.name}
		{...$constraints.name}
	/>
	<SlugInput prefix="/shop/{orgSlug}/" type="text" id="slug" name="slug" label="Store Slug" />
	<ColorPicker />
	<Shipping />
</Form>
