import { relations } from 'drizzle-orm';
import { stores, orgs } from '$lib/server/db/schema';

export const orgsRelations = relations(orgs, ({ many }) => ({
	stores: many(stores)
}));

export const storesRelations = relations(stores, ({ one }) => ({
	org: one(orgs, {
		fields: [stores.orgId],
		references: [orgs.id]
	})
}));
