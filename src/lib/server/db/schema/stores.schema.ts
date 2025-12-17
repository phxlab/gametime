import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { timestamps, archivedAt } from './shared';
import { orgs } from './orgs.schema';

export const stores = sqliteTable(
	'stores',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		slug: text('slug').notNull(),
		color: text('color').notNull(),
		shipping: text('shipping', { enum: ['required', 'optional', 'none'] }).notNull(),
		...timestamps,
		...archivedAt,
		orgId: integer('org_id')
			.notNull()
			.references(() => orgs.id)
	},
	(t) => [uniqueIndex('org_slug_idx').on(t.orgId, t.slug)]
);
