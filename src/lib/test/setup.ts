import { testClient } from 'hono/testing';
import app, { type AppType } from '$lib/server/api/app';
import { applyD1Migrations, env } from 'cloudflare:test';
import { drizzle } from 'drizzle-orm/d1';
import { schema } from '$lib/server/db/schema';
import { Org as OrgService } from '$lib/server/services';

await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
export const client = testClient<AppType>(app, env).api;

export const db = drizzle(env.DB, { schema });

export const Org = new OrgService(db);
