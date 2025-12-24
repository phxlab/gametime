import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const orgs = await locals.Org.list();

	return { orgs };
};
