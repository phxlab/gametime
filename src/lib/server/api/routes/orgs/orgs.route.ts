import { Hono } from 'hono';
import { protect, zValidator } from '$lib/server/api/middleware';
import {
	insertOrgSchema,
	selectOrgSchema,
	selectOrgWithStoreSchema,
	slugParamSchema,
	updateOrgSchema
} from '$lib/server/db/zod';
import ok from '$lib/server/http/ok.ts';

const orgs = new Hono()
	/**
	 * @route POST /api/orgs
	 * @auth required
	 * @description Create new org
	 */
	.post('/', protect, zValidator('json', insertOrgSchema), async (c) => {
		const Org = c.var.Org;

		const insertData = c.req.valid('json');

		const data = await Org.create(insertData);

		return c.json(ok(selectOrgSchema, data, 'Org created'), 201);
	})
	/**
	 * @route GET /api/orgs
	 * @auth required
	 * @description List all orgs
	 */
	.get('/', protect, async (c) => {
		const Org = c.var.Org;

		const data = await Org.list();

		return c.json(ok(selectOrgWithStoreSchema, data), 200);
	})
	/**
	 * @route GET /api/orgs/:slug
	 * @auth public
	 * @description Fetch org by slug
	 */
	.get('/:slug', zValidator('param', slugParamSchema), async (c) => {
		const { slug } = c.req.valid('param');
		const Org = c.var.Org;

		const data = await Org.find(slug);

		return c.json(ok(selectOrgSchema, data), 200);
	})
	/**
	 * @route PUT /api/orgs/:slug
	 * @auth required
	 * @description Update org by slug
	 */
	.put(
		'/:slug',
		protect,
		zValidator('param', slugParamSchema),
		zValidator('json', updateOrgSchema),
		async (c) => {
			const { slug } = c.req.valid('param');
			const newData = c.req.valid('json');
			const Org = c.var.Org;

			const data = await Org.update(slug, newData);

			return c.json(ok(selectOrgSchema, data, 'Org Updated'), 200);
		}
	)
	/**
	 * @route DELETE /api/orgs/:slug
	 * @auth required
	 * @description Delete org by slug
	 */
	.delete('/:slug', protect, zValidator('param', slugParamSchema), async (c) => {
		const { slug } = c.req.valid('param');
		const Org = c.var.Org;

		await Org.delete(slug);

		return c.body(null, 204);
	});

export default orgs;
