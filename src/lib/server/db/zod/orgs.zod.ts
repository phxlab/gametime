import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { orgs } from '$lib/server/db/schema';
import { selectStoreSchema } from './stores.zod';
import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const slugSchema = z.string().min(3, 'Slug must be at least 3 characters').regex(slugRegex, {
	message:
		'Slug must be lowercase, alphanumeric, and cannot contain spaces, double dashes, or start/end with a dash.'
});

export const insertOrgSchema = createInsertSchema(orgs, {
	name: (schema) => schema.min(1, 'Name is required'),
	slug: () => slugSchema
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateOrgSchema = insertOrgSchema.partial().omit({
	slug: true
});

export const selectOrgSchema = createSelectSchema(orgs).omit({
	updatedAt: true,
	archivedAt: true
});

export const selectOrgListSchema = z.array(selectOrgSchema);

export const selectOrgWithStoreSchema = z.array(
	selectOrgSchema.extend({
		stores: z.array(selectStoreSchema)
	})
);

export const OrgsResponse = z.array(
	selectOrgSchema.extend({
		stores: z.array(selectStoreSchema),
		createdAt: z.string()
	})
);

export const slugParamSchema = z.object({
	slug: slugSchema
});
