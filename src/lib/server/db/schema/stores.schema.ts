import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { timestamps, archivedAt } from '$lib/server/db/schema/shared.ts';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const stores = sqliteTable('stores', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	color: text('color').notNull(),
	shipping: text('shipping', { enum: ['required', 'optional', 'none'] }).notNull(),
	...timestamps,
	...archivedAt
});

export const insertStoreSchema = createInsertSchema(stores).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateStoreSchema = insertStoreSchema.partial();

export type NewStore = z.infer<typeof insertStoreSchema>;
export type UpdateStore = z.infer<typeof updateStoreSchema>;
