import { expect } from 'vitest';

// @ts-expect-error unknown result
export const expectZodError = (result, ERR: { message: string }) => {
	expect(result.success).toBe(false);
	if (!result.success) {
		// @ts-expect-error unknown result
		expect(result.error.issues.some((i) => i.message === ERR.message)).toBe(true);
	}
};
