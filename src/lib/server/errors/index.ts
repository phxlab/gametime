import type { Context } from 'hono';
import { JOSEError } from 'jose/errors';
import handleJoseError from '$lib/server/errors/jose.error.ts';
import { HTTPException } from 'hono/http-exception';

const globalErrorHandler = (err: Error, c: Context) => {
	if (err instanceof JOSEError) {
		return handleJoseError(err, c);
	}

	if (err instanceof HTTPException) {
		return c.json(
			{
				success: false,
				error: {
					name: err.message,
					message: err.cause
				}
			},
			err.status
		);
	}

	return c.json({ message: 'Internal Server Error' }, 500);
};

export default globalErrorHandler;
