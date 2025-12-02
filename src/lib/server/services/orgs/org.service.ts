import { type DrizzleD1Database } from 'drizzle-orm/d1';
import type { NewOrg, schema, UpdateOrg } from '$lib/server/db/schema';
import { orgs } from '$lib/server/db/schema';
import { HTTPException } from 'hono/http-exception';
import { and, eq, isNull } from 'drizzle-orm';

class OrgService {
	private readonly db: DrizzleD1Database<typeof schema>;

	constructor(db: DrizzleD1Database<typeof schema>) {
		this.db = db;
	}

	public async findMany() {
		return this.db.query.orgs.findMany({
			where: isNull(orgs.archivedAt)
		});
	}

	public async create(insertData: NewOrg) {
		const result = await this.db
			.insert(orgs)
			.values(insertData)
			.onConflictDoNothing()
			.returning()
			.get();

		if (!result) {
			throw new HTTPException(409, { message: 'Conflict', cause: 'Org already exists' });
		}

		return result;
	}

	public async getBySlug(slug: string) {
		const data = await this.db.query.orgs.findFirst({
			where: and(eq(orgs.slug, slug), isNull(orgs.archivedAt))
		});

		if (!data) {
			throw new HTTPException(404, { message: 'Org not found' });
		}

		return data;
	}

	public async updateBySlug(slug: string, updateData: UpdateOrg) {
		const data = await this.db
			.update(orgs)
			.set(updateData)
			.where(and(eq(orgs.slug, slug), isNull(orgs.archivedAt)))
			.returning()
			.get();

		if (!data) {
			throw new HTTPException(404, { message: 'Org not found' });
		}

		return data;
	}

	public async deleteBySlug(slug: string) {
		const data = await this.db
			.update(orgs)
			.set({ archivedAt: new Date() })
			.where(eq(orgs.slug, slug));

		if (!data) {
			throw new HTTPException(404, { message: 'Org not found' });
		}

		return data;
	}
}

export default OrgService;
