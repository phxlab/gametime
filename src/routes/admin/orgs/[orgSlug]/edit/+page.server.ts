import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { updateOrgSchema } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import client from '$lib/client';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const res = await client(fetch).api.orgs[':slug'].$get({
		param: {
			slug: params.orgSlug
		}
	});

	const json = await res.json();

	const form = await superValidate(json.data, zod4(updateOrgSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod4(updateOrgSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const res = await client(event.fetch).api.orgs[':slug'].$put({
				param: {
					slug: event.params.orgSlug,
				},
				json: {
					name: form.data.name
				}
			});

			const json = await res.json();

			if (!json.success && !res.ok) {
				return message(form, json.error.message, { status: 400 });
			}


		} catch (err) {
			console.error(err);
			return message(form, 'Connection failed. Please try again.', { status: 500 });
		}

		throw redirect(
			`/admin`,
			{
				type: 'success',
				message: 'Organization Updated',
			},
			event
		);
	}
}
