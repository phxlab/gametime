import type { AppType } from '$lib/server/api/app';
import { hc } from 'hono/client';
import { redirect } from '@sveltejs/kit';

const client = (fetch: typeof globalThis.fetch) => {
	return hc<AppType>('/', {
		fetch
	});
};

export const validateResponse = (res: Response) => {
	if (res.status === 401) {
		throw redirect(302, '/auth');
	}
};

export default client;
