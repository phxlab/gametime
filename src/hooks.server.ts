import { redirect, type Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';
import { PRIVATE_JWT_SECRET } from '$env/static/private';
import { Org, Store } from '$lib/server/services';
import { drizzle } from 'drizzle-orm/d1';
import { schema } from '$lib/server/db/schema';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const token = event.cookies.get('admin_session');

		if (!token) {
			throw redirect(303, '/login');
		}

		try {
			const secret = new TextEncoder().encode(PRIVATE_JWT_SECRET);
			await jwtVerify(token, secret);
		} catch (err: unknown) {
			console.error(err);
			throw redirect(303, '/login');
		}
	}

	if (!event.platform) {
		throw new Error('Event platform is undefined');
	}

	const db = drizzle(event.platform.env.DB, { schema });
	event.locals.db = db;
	event.locals.Org = new Org(db);
	const { orgSlug } = event.params;
	if (orgSlug) {
		const currentOrg = await event.locals.Org.find(orgSlug);
		event.locals.Store = new Store(db, currentOrg.id);
		event.locals.currentOrg = currentOrg;
	}

	return resolve(event);
};
