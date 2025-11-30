import { beforeAll, describe, expect, it } from 'vitest';
import { client, Org } from '$lib/test/setup';
import { generateTestTokens } from '$lib/test/defaults.ts';

const token = await generateTestTokens();

describe('Orgs', () => {
	beforeAll(async () => {
		await Org.create({
			name: 'Main Store',
			slug: 'main'
		});
	});

	describe('GET /orgs', () => {
		it('should fail with no token', async () => {
			const req = await client.orgs.$get();

			const res = await req.json();

			expect(req.status).toBe(401);
			expect(res.success).toBe(false);
			expect(res.data).toBe(undefined);
		});

		it('should list all Orgs', async () => {
			const req = await client.orgs.$get(
				{},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(req.status).toBe(200);
			expect(res.success).toBe(true);
			expect(res.data).toBeDefined();
		});
	});

	describe('POST /orgs', () => {
		it('should fail with no token', async () => {
			const req = await client.orgs.$post({
				json: {
					name: 'Test Org',
					slug: 'test'
				}
			});

			const res = await req.json();

			expect(req.status).toBe(401);
			expect(res.success).toBe(false);
			expect(res.data).toBe(undefined);
		});

		it('should fail making duplicate', async () => {
			const req = await client.orgs.$post(
				{
					json: {
						name: 'Main',
						slug: 'main'
					}
				},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(req.status).toBe(409);
			expect(res.success).toBe(false);
		});

		it('should create an org', async () => {
			const req = await client.orgs.$post(
				{
					json: {
						name: 'Test Org',
						slug: 'test'
					}
				},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(req.status).toBe(201);
			expect(res.success).toBe(true);
			expect(res.data.name).toBe('Test Org');
			expect(res.data.slug).toBe('test');
		});

		it('should create an org and make url safe', async () => {
			const req = await client.orgs.$post(
				{
					json: {
						name: 'Test Org',
						slug: 'TeSt 123'
					}
				},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(req.status).toBe(201);
			expect(res.success).toBe(true);
			expect(res.data.name).toBe('Test Org');
			expect(res.data.slug).toBe('test-123');
		});
	});

	describe('GET /orgs/:org', () => {
		it('should fail with invalid org', async () => {
			const req = await client.orgs[':slug'].$get({
				param: {
					slug: 'test123'
				}
			});
			const res = await req.json();

			expect(res.success).toBe(false);
		});

		it('should pass with no token', async () => {
			const req = await client.orgs[':slug'].$get({
				param: {
					slug: 'main'
				}
			});

			const res = await req.json();

			expect(req.status).toBe(200);
			expect(res.success).toBe(true);
		});
	});

	describe('PUT /orgs/:org', () => {
		it('should fail no token', async () => {
			const req = await client.orgs[':slug'].$put({
				json: {
					name: 'Test Org'
				},
				param: {
					slug: 'main'
				}
			});

			const res = await req.json();

			expect(req.status).toBe(401);
			expect(res.success).toBe(false);
		});

		it('should pass', async () => {
			const req = await client.orgs[':slug'].$put(
				{
					json: {
						name: 'Test Org 123'
					},
					param: {
						slug: 'main'
					}
				},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(req.status).toBe(200);
			expect(res.success).toBe(true);
			expect(res.data.name).toBe('Test Org 123');
		});

		it('should fail no data', async () => {
			const req = await client.orgs[':slug'].$put(
				{
					json: {
						//@ts-expect-error: Should fail due to test
						name: null
					},
					param: {
						slug: 'main'
					}
				},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(req.status).toBe(400);
			expect(res.success).toBe(false);
		});
	});
});
