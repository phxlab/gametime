import type { LayoutServerLoad } from './$types';
import client from '$lib/client';
import { validateResponse } from '$lib/client';
import { loadFlash } from 'sveltekit-flash-message/server';


export const load: LayoutServerLoad = loadFlash(async ({ fetch, cookies }) => {
	console.log('ran')
	if (!cookies.get('admin_session')) {
		return;
	}

	const res = await client(fetch).api.orgs.$get();
	validateResponse(res);

	const body = await res.json();

	return { orgs: body.data };
});
