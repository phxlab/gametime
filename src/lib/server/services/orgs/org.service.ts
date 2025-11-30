import { type DrizzleD1Database } from 'drizzle-orm/d1';
import type { NewOrg, schema } from '$lib/server/db/schema';
import { orgs } from '$lib/server/db/schema';
import { HTTPException } from 'hono/http-exception';
import { eq } from 'drizzle-orm';

class OrgService {
	private readonly db: DrizzleD1Database<typeof schema>;

	constructor(db: DrizzleD1Database<typeof schema>) {
		this.db = db;
	}

	public async findMany() {
		return this.db.query.orgs.findMany();
	}

	public async create(insertData: NewOrg) {
		const data = {
			name: insertData.name,
			slug: insertData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
		};

		const result = await this.db.insert(orgs).values(data).onConflictDoNothing().returning().get();

		if (!result) {
			throw new HTTPException(409, { message: 'Conflict', cause: 'Org already exists' });
		}

		return result;
	}

	public async getBySlug(slug: string) {
		const data = await this.db.query.orgs.findFirst({ where: (orgs) => eq(orgs.slug, slug) });

		if (!data) {
			throw new HTTPException(404, { message: 'Org not found' });
		}

		return data;
	}
}

export default OrgService;
