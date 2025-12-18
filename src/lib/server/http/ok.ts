import type { ZodType } from 'zod';

export function ok<T extends ZodType>(schema: T, data: unknown, message?: string) {
	return {
		success: true,
		data: schema.parse(data),
		message
	};
}

export default ok;
