import { createMiddleware } from 'hono/factory';
import type { Env } from '$lib/server/types/hono';
import { jwtVerify } from 'jose';
import { getCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';

const protectMiddleware = createMiddleware<Env>(async (c, next) => {
	const secret = new TextEncoder().encode(c.env.PRIVATE_JWT_SECRET);
	const token = getCookie(c, 'admin_session');

	if (!token) {
		throw new HTTPException(401, { message: 'Unauthorized', cause: 'No token provided' });
	}

	await jwtVerify(token, secret);

	await next();
});

export default protectMiddleware;
