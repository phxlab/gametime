import type { LayoutServerLoad } from './$types';
import { Store } from '$lib/server/services';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const currentOrg = await locals.Org.find(params.orgSlug);
	locals.Store = new Store(locals.db, currentOrg.id);

	return {
		currentOrg
	};
};
