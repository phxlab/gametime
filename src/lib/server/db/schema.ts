import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const orgs = sqliteTable('orgs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date())
});

export const schema = { orgs };

export const insertOrgSchema = createSelectSchema(orgs, {
	name: (schema) => schema.min(3, 'Name must be at least 3 chars'),
	slug: (schema) => schema.regex(/^[a-z0-9-]+$/, 'Slug must be lowercase')
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true
});

export type NewOrg = z.infer<typeof insertOrgSchema>;
