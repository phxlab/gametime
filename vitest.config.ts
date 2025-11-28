import { defineWorkersConfig, readD1Migrations } from '@cloudflare/vitest-pool-workers/config';
import { fileURLToPath } from 'node:url';
import path from 'path';

const migrationsPath = path.join(__dirname, 'drizzle');
const migrations = await readD1Migrations(migrationsPath);

export default defineWorkersConfig({
	test: {
		setupFiles: ['./src/lib/test/setup.ts'],
		alias: {
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
			'$lib/server': fileURLToPath(new URL('./src/lib/server', import.meta.url))
		},
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.jsonc' },
				miniflare: {
					bindings: { TEST_MIGRATIONS: migrations }
				}
			}
		}
	}
});
