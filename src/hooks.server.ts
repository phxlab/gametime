import { redirect, type Handle } from '@sveltejs/kit';
import { jwtVerify } from 'jose';
import { PRIVATE_JWT_SECRET } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const token = event.cookies.get('admin_session');

		if (!token) {
			throw redirect(303, '/auth');
		}

		try {
			const secret = new TextEncoder().encode(PRIVATE_JWT_SECRET);
			await jwtVerify(token, secret);
		} catch (err: unknown) {
			console.error(err);
			throw redirect(303, '/login');
		}
	}

	return resolve(event);
};
