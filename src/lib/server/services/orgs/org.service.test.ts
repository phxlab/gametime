import { db } from '$lib/test/setup';
import OrgService from './org.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { orgs } from '$lib/server/db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { seedOrgs } from '$lib/test/seeds';
import { ERR } from '$lib/server/faults';

const Org = new OrgService(db);

describe('OrgService', () => {
	beforeEach(async () => {
		await db.delete(orgs);
	});

	describe('create()', () => {
		it('should create an org', async () => {
			const result = await Org.create({
				name: 'Test Org',
				slug: 'test-org'
			});

			const dbData = await db.query.orgs.findFirst({
				where: and(eq(orgs.slug, 'test-org'), isNull(orgs.archivedAt))
			});

			expect(dbData).toMatchObject({
				name: 'Test Org',
				slug: 'test-org'
			});

			expect(result).toMatchObject({
				name: 'Test Org',
				slug: 'test-org'
			});

			expect(result.id).toBeTypeOf('number');
			expect(result.createdAt).toBeInstanceOf(Date);
			expect(result.updatedAt).toBeInstanceOf(Date);
			expect(result.archivedAt).toBeNull();
		});

		it('should throw a duplicate error', async () => {
			await seedOrgs();

			await expect(
				Org.create({
					name: 'Duplicate Org',
					slug: 'alpha'
				})
			).rejects.toMatchObject({
				code: ERR.ORG_EXISTS.code,
				message: ERR.ORG_EXISTS.message
			});
		});

		it('should not allow creating an org with slug of an archived org', async () => {
			await seedOrgs();

			await expect(
				Org.create({
					name: 'Recreate Archived',
					slug: 'archived'
				})
			).rejects.toMatchObject({
				code: ERR.ORG_EXISTS.code,
				message: ERR.ORG_EXISTS.message
			});
		});
	});

	describe('list()', () => {
		it('should list all active orgs', async () => {
			const emptyResult = await Org.list();

			expect(emptyResult).toHaveLength(0);

			await seedOrgs();

			const result = await Org.list();

			// excludes archived
			const slugs = result.map((o) => o.slug);
			expect(slugs).not.toContain('archived');

			// alphabetical order
			const names = result.map((o) => o.name);
			expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));

			expect(result[0]).toHaveProperty('id');
			expect(result[0]).toHaveProperty('name');
			expect(result[0]).toHaveProperty('slug');
			expect(Array.isArray(result[0].stores)).toBe(true);
			expect(result[0]).toHaveProperty('createdAt');
			expect(result[0]).toHaveProperty('updatedAt');
			expect(result[0]).toHaveProperty('archivedAt');
			expect(result).toHaveLength(4);
		});
	});

	describe('find()', () => {
		it('should find an active org by slug', async () => {
			await seedOrgs();

			const result = await Org.find('alpha');

			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('name');
			expect(result).toHaveProperty('slug');
			expect(result).toHaveProperty('createdAt');
			expect(result).toHaveProperty('updatedAt');
			expect(result).toHaveProperty('archivedAt');
			expect(result).not.toHaveProperty('stores');
		});

		it('should throw a not found error', async () => {
			await expect(Org.find('not-found')).rejects.toMatchObject({
				code: ERR.ORG_NOT_FOUND.code,
				message: ERR.ORG_NOT_FOUND.message
			});
		});

		it('should not find an archived org', async () => {
			await seedOrgs();

			await expect(Org.find('archived')).rejects.toMatchObject({
				code: ERR.ORG_NOT_FOUND.code,
				message: ERR.ORG_NOT_FOUND.message
			});
		});
	});

	describe('update()', () => {
		it('should update a org', async () => {
			await seedOrgs();

			const result = await Org.update('alpha', {
				name: 'Updated Org'
			});

			const dbData = await db.query.orgs.findFirst({
				where: and(eq(orgs.slug, 'alpha'), isNull(orgs.archivedAt))
			});

			expect(dbData).toMatchObject({
				name: 'Updated Org',
				slug: 'alpha'
			});

			expect(result).toMatchObject({
				name: 'Updated Org',
				slug: 'alpha'
			});

			expect(result.id).toBeTypeOf('number');
			expect(result.createdAt).toBeInstanceOf(Date);
			expect(result.updatedAt).toBeInstanceOf(Date);
			expect(result.archivedAt).toBeNull();

			const allOrgs = await Org.list();
			expect(allOrgs).toHaveLength(4);
		});

		it('should throw not found error', async () => {
			await expect(
				Org.update('not-found', {
					name: 'Updated Org'
				})
			).rejects.toMatchObject({
				code: ERR.ORG_NOT_FOUND.code,
				message: ERR.ORG_NOT_FOUND.message
			});
		});

		it('should not update an archived org', async () => {
			await seedOrgs();

			await expect(
				Org.update('archived', {
					name: 'Updated Org'
				})
			).rejects.toMatchObject({
				code: ERR.ORG_NOT_FOUND.code,
				message: ERR.ORG_NOT_FOUND.message
			});

			const dbData = await db.query.orgs.findFirst({
				where: eq(orgs.slug, 'archived')
			});

			expect(dbData).toMatchObject({
				name: 'Archived Org'
			});
		});
	});

	describe('delete()', () => {
		it('should delete a org', async () => {
			await seedOrgs();

			await Org.delete('alpha');
			const dbData = await db.query.orgs.findFirst({
				where: eq(orgs.slug, 'alpha')
			});

			expect(dbData).toMatchObject({
				archivedAt: expect.any(Date)
			});

			await expect(Org.find('alpha')).rejects.toMatchObject({
				code: ERR.ORG_NOT_FOUND.code,
				message: ERR.ORG_NOT_FOUND.message
			});

			const list = await Org.list();
			expect(list.map((o) => o.slug)).not.toContain('alpha');
		});

		it('should ignore bad input', async () => {
			const result = await Org.delete('not-found');

			expect(result).toBe(undefined);
		});
	});
});
