import type { Org as OrgService, Store as StoreService } from '$lib/server/services';
import type { Org } from '$lib/server/contracts';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { schema } from '$lib/server/db/schema';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			Org: OrgService;
			Store: StoreService;
			currentOrg: Org;
			db: DrizzleD1Database<typeof schema>;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		// interface PageState {}

		interface Platform {
			env: {
				DB: D1Database;
			};
			context: ExecutionContext;
			cf: CfProperties;
			caches: CacheStorage & { default: Cache };
		}
	}
	interface Window {
		turnstile: {
			render: (element: HTMLElement | string, options: never) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId?: string) => void;
			getResponse: (widgetId?: string) => string | undefined;
		};
	}
}

export {};
