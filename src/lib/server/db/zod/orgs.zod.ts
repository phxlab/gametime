import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { orgs } from '$lib/server/db/schema';
import { selectStoreSchema } from './stores.zod';
import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const insertOrgSchema = createInsertSchema(orgs, {
	name: (schema) => schema.min(1, 'Name is required'),
	slug: (schema) =>
		schema.min(3, 'Slug must be at least 3 characters').regex(slugRegex, {
			message:
				'Slug must be lowercase, alphanumeric, and cannot contain spaces, double dashes, or start/end with a dash.'
		})
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateOrgSchema = insertOrgSchema.partial();

export const selectOrgSchema = createSelectSchema(orgs).omit({
	updatedAt: true,
	archivedAt: true
});

export const selectOrgWithStoreSchema = selectOrgSchema.extend({
	createdAt: z.string(),
	stores: z.array(selectStoreSchema)
});
