import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import path from 'path';

function getLocalD1DB() {
	const basePath = path.resolve('.wrangler/state/v3/d1/miniflare-D1DatabaseObject');

	const dbFile = fs.readdirSync(basePath).find((f) => f.endsWith('.sqlite'));

	if (!dbFile) {
		throw new Error('No database file found');
	}

	return path.join(basePath, dbFile);
}

export default defineConfig({
	schema: './src/lib/server/db/schema/index.ts',
	out: './drizzle',
	dialect: 'sqlite',
	dbCredentials: {
		url: getLocalD1DB()
	}
});
