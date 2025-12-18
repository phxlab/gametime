import type { Context } from 'hono';
import { JOSEError } from 'jose/errors';
import handleJoseError from './adapters/jose.adapter';
import { HTTPException } from 'hono/http-exception';
import ErrorResponse from '$lib/server/http/ErrorResponse';

const errorBoundary = (err: Error, c: Context) => {
	if (err instanceof JOSEError) {
		return handleJoseError(err, c);
	}

	if (err instanceof ErrorResponse) {
		return c.json(
			{
				success: false,
				error: {
					code: err.code,
					message: err.message,
					details: err.details
				}
			},
			err.status
		);
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

	console.error(err);

	return c.json(
		{
			success: false,
			error: {
				name: 'Internal Server Error',
				message: 'Internal Server Error'
			}
		},
		500
	);
};

export default errorBoundary;
