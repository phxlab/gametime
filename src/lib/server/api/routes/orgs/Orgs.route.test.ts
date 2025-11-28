import { describe, expect, it } from 'vitest';
import { client } from '$lib/test/setup';

describe('Orgs', () => {
	describe('GET /orgs', () => {
		it('with No token provided', async () => {
			const req = await client.orgs.$get('/');

			const res = await req.json();

			expect(res.success).toBe(false);
			expect(res.data).toBe(undefined);
		});

		it('No token provided', async () => {
			const req = await client.orgs.$get('/', {
				headers: {
					cookie:
						'admin_session=eyJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNzY0MzY0NDAyLCJleHAiOjE3NjQ5NjkyMDJ9.DRFcboXkR6149E8w-wLNlS-x5CTwYotk8qambSbid1s'
				}
			});

			const res = await req.json();

			expect(res.success).toBe(true);
			expect(res.data).toBeDefined();
		});
	});
});
