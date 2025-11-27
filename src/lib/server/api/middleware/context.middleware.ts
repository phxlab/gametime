import { createMiddleware } from 'hono/factory';
import { schema } from '$lib/server/db/schema';
import type { Env } from '$lib/server/types/hono';
import { drizzle } from 'drizzle-orm/d1';
import { Org } from '$lib/server/services';

const contextMiddleware = createMiddleware<Env>(async (c, next) => {
	const db = drizzle(c.env.DB, { schema });

	const OrgService = new Org(db);

	c.set('DB', db);
	c.set('Org', OrgService);

	await next();
});

export default contextMiddleware;
