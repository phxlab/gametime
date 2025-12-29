import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { createOrgSchema } from '$lib/server/contracts/orgs.contract';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { handleActionError } from '$lib/server/http';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(createOrgSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const { locals } = event;
		const form = await superValidate(event.request, zod4(createOrgSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.Org.create(form.data);
		} catch (err) {
			return handleActionError(form, err);
		}

		throw redirect(
			`/admin/orgs/${form.data.slug}`,
			{
				type: 'success',
				message: 'Organization Created'
			},
			event
		);
	}
};
