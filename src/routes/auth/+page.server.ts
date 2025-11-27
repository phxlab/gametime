import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import {
	PRIVATE_TURNSTILE_SECRET_KEY,
	PRIVATE_ADMIN_PASSWORD,
	PRIVATE_JWT_SECRET
} from '$env/static/private';
import { SignJWT } from 'jose';

interface TurnstileVerifyResponse {
	success: boolean;
	'error-codes': string[];
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const token = data.get('cf-turnstile-response') as string;

		const cfVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				secret: PRIVATE_TURNSTILE_SECRET_KEY,
				response: token
			})
		});

		const cfData: TurnstileVerifyResponse = await cfVerify.json();

		if (!cfData.success) {
			return fail(400, { error: 'Security check failed. Please try again.' });
		}

		if (password !== PRIVATE_ADMIN_PASSWORD) {
			return fail(403, { error: 'Incorrect access code.' });
		}

		const secret = new TextEncoder().encode(PRIVATE_JWT_SECRET);

		const jwtToken = await new SignJWT({ admin: true })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('7d')
			.sign(secret);

		cookies.set('admin_session', jwtToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		throw redirect(303, '/admin');
	}
} satisfies Actions;
