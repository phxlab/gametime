import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps, archivedAt } from '$lib/server/db/schema/shared.ts';

export const orgs = sqliteTable('orgs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	...timestamps,
	...archivedAt
});

export const schema = { orgs };

export const insertOrgSchema = createInsertSchema(orgs).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateOrgSchema = insertOrgSchema.omit({ slug: true }).partial();

export type NewOrg = z.infer<typeof insertOrgSchema>;
export type UpdateOrg = z.infer<typeof updateOrgSchema>;
