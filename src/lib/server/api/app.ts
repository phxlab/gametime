import { Hono } from 'hono';
import { orgs } from './routes';
import { contextMiddleware } from '$lib/server/api/middleware';
import globalErrorHandler from '$lib/server/errors';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
	return c.json({
		version: '2.0.0'
	});
});

app.use('*', contextMiddleware);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/orgs', orgs);

app.onError(globalErrorHandler);

export default app;
export type AppType = typeof routes;
