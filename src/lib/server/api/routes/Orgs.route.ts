import { Hono } from 'hono';
import { protect } from '$lib/server/api/middleware';

const orgs = new Hono().get('/', protect, async (c) => {
	const Org = c.var.Org;

	const data = await Org.findMany();

	return c.json({
		data
	});
});

export default orgs;
