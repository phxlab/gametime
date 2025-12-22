import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { type schema } from '$lib/server/db/schema';

class StoresService {
	private readonly db: DrizzleD1Database<typeof schema>;
	private readonly org: number;

	constructor(db: DrizzleD1Database<typeof schema>, org: number) {
		this.db = db;
		this.org = org;
	}

	public async list() {}
}

export default StoresService;
