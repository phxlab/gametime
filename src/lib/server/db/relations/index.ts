import { relations } from 'drizzle-orm';
import { stores, orgs, items } from '../schema';

export const orgsRelations = relations(orgs, ({ many }) => ({
	stores: many(stores)
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
	org: one(orgs, {
		fields: [stores.orgId],
		references: [orgs.id]
	}),
	items: many(items)
}));

export const itemsRelations = relations(items, ({ one }) => ({
	store: one(stores, {
		fields: [items.storeId],
		references: [stores.id]
	})
}));
