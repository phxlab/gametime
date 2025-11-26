declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
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
			render: (element: HTMLElement | string, options: any) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId?: string) => void;
			getResponse: (widgetId?: string) => string | undefined;
		};
	}
}

export {};
