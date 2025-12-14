declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
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
