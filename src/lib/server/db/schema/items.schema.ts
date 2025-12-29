import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
import { archivedAt, timestamps } from './shared.ts';
import { stores } from './stores.schema.ts';

export const items = sqliteTable(
	'items',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		storeId: integer('store_id')
			.notNull()
			.references(() => stores.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		description: text('description'),
		basePrice: integer('base_price').notNull(),
		isActive: integer('is_active', { mode: 'boolean' }).default(true),
		...timestamps,
		...archivedAt
	},
	(t) => [index('items_store_idx').on(t.storeId), index('items_active_idx').on(t.isActive)]
);
