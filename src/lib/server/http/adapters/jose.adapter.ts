import { JOSEError } from 'jose/errors';
import type { Context } from 'hono';

const JOSE_ERROR_MAP: Record<string, string> = {
	ERR_JOSE_ALG_NOT_ALLOWED: 'Unsupported algorithm',
	ERR_JOSE_GENERIC: 'General JOSE error',
	ERR_JOSE_NOT_SUPPORTED: 'Unsupported JOSE format',
	ERR_JWE_DECRYPTION_FAILED: 'Failed to decrypt JWE',
	ERR_JWE_INVALID: 'Invalid JWE',
	ERR_JWK_INVALID: 'Invalid JWK',
	ERR_JWKS_INVALID: 'Invalid JWKS',
	ERR_JWKS_MULTIPLE_MATCHING_KEYS: 'Multiple matching keys found',
	ERR_JWKS_NO_MATCHING_KEY: 'No matching key found',
	ERR_JWKS_TIMEOUT: 'JWKS request timed out',
	ERR_JWS_INVALID: 'Invalid JWS',
	ERR_JWS_SIGNATURE_VERIFICATION_FAILED: 'Failed to verify JWS signature',
	ERR_JWT_CLAIM_VALIDATION_FAILED: 'Failed to validate JWT claims',
	ERR_JWT_EXPIRED: 'JWT expired',
	ERR_JWT_INVALID: 'Invalid JWT'
};

const handleJoseError = (err: unknown, c: Context) => {
	if (!(err instanceof JOSEError)) {
		throw err;
	}

	const message = JOSE_ERROR_MAP[err.code] ?? 'Unknown authentication error';

	return c.json(
		{
			success: false,
			error: {
				code: 'AUTH_INVALID_TOKEN',
				message
			}
		},
		401
	);
};

export default handleJoseError;
