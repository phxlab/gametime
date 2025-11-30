import { JOSEError } from 'jose/errors';
import type { Context } from 'hono';

const handleJoseError = (err: unknown, c: Context) => {
	let cause = '';

	if (err instanceof JOSEError) {
		switch (err.code) {
			case 'ERR_JOSE_ALG_NOT_ALLOWED':
				cause = 'Unsupported algorithm';
				break;
			case 'ERR_JOSE_GENERIC':
				cause = 'General Jose Error';
				break;
			case 'ERR_JOSE_NOT_SUPPORTED':
				cause = 'Unsupported JOSE format';
				break;
			case 'ERR_JWE_DECRYPTION_FAILED':
				cause = 'Failed to decrypt JWE';
				break;
			case 'ERR_JWE_INVALID':
				cause = 'Invalid JWE';
				break;
			case 'ERR_JWK_INVALID':
				cause = 'Invalid JWK';
				break;
			case 'ERR_JWKS_INVALID':
				cause = 'Invalid JWKS';
				break;
			case 'ERR_JWKS_MULTIPLE_MATCHING_KEYS':
				cause = 'Multiple matching keys found';
				break;
			case 'ERR_JWKS_NO_MATCHING_KEY':
				cause = 'No matching key found';
				break;
			case 'ERR_JWKS_TIMEOUT':
				cause = 'JWKS request timed out';
				break;
			case 'ERR_JWS_INVALID':
				cause = 'Invalid JWS';
				break;
			case 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED':
				cause = 'Failed to verify JWS signature';
				break;
			case 'ERR_JWT_CLAIM_VALIDATION_FAILED':
				cause = 'Failed to validate JWT claims';
				break;
			case 'ERR_JWT_EXPIRED':
				cause = 'JWT expired';
				break;
			case 'ERR_JWT_INVALID':
				cause = 'Invalid JWT';
				break;
			default:
				cause = 'Unknown JOSE error';
		}
	}

	return c.json(
		{
			success: false,
			error: {
				name: 'Unauthorized',
				message: cause
			}
		},
		401
	);
};

export default handleJoseError;
