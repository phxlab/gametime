import { SignJWT } from 'jose';
import { env } from 'cloudflare:test';

export async function generateTestTokens() {
	// 1. Get the Real Secret (from Vitest env)
	const secret = new TextEncoder().encode(env.PRIVATE_JWT_SECRET || 'test-secret');

	// 2. Create a Fake Secret (to test signature verification)
	const wrongSecret = new TextEncoder().encode('wrong-secret-key');

	return {
		// ✅ Happy Path
		valid: await new SignJWT({ admin: true })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('2h')
			.sign(secret),

		// ❌ Expired (Time travel to the past)
		expired: await new SignJWT({ admin: true })
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime('-1s') // Expired 1 second ago
			.sign(secret),

		// ❌ Malformed (Garbage string)
		invalid: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.garbage.token',

		// ❌ Bad Signature (Hacker tried to forge it)
		// This tests that your server actually checks the signature!
		badSignature: await new SignJWT({ admin: true })
			.setProtectedHeader({ alg: 'HS256' })
			.sign(wrongSecret)
	};
}
