import { Hono } from 'hono';
import { protect } from '$lib/server/api/middleware';
import { insertOrgSchema, updateOrgSchema } from '$lib/server/db/schema';
import { sValidator } from '@hono/standard-validator';

const orgs = new Hono()
	.get('/', protect, async (c) => {
		const Org = c.var.Org;

		const data = await Org.findMany();

		return c.json({
			success: true,
			data
		});
	})
	.post('/', protect, sValidator('json', insertOrgSchema), async (c) => {
		const Org = c.var.Org;

		const insertData = c.req.valid('json');

		const data = await Org.create(insertData);

		return c.json(
			{
				success: true,
				data,
				message: 'Organization created successfully.'
			},
			201
		);
	})
	.get('/:slug', async (c) => {
		const { slug } = c.req.param();
		const Org = c.var.Org;

		const data = await Org.getBySlug(slug);

		return c.json({
			success: true,
			data
		});
	})
	.put('/:slug', protect, sValidator('json', updateOrgSchema), async (c) => {
		const { slug } = c.req.param();
		const newData = c.req.valid('json');
		const Org = c.var.Org;

		const data = await Org.updateBySlug(slug, newData);

		return c.json({
			success: true,
			data
		});
	})
	.delete('/:slug', protect, async (c) => {
		const { slug } = c.req.param();
		const Org = c.var.Org;

		await Org.deleteBySlug(slug);

		return c.json(
			{
				success: true,
				data: {},
				message: 'Organization deleted successfully.'
			},
			200
		);
	});

export default orgs;
