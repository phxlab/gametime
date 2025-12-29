import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { timestamps, archivedAt } from './shared';
import { orgs } from './orgs.schema';

export const stores = sqliteTable(
	'stores',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		orgId: integer('org_id')
			.notNull()
			.references(() => orgs.id, { onDelete: 'cascade' }),
		name: text('name').notNull(),
		slug: text('slug').notNull(),
		shipping: text('shipping', { enum: ['required', 'optional', 'none'] }).notNull(),
		...timestamps,
		...archivedAt
	},
	(t) => [uniqueIndex('stores_org_slug_unique').on(t.orgId, t.slug)]
);
