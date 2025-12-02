import * as orgsSchema from './orgs.schema';
import * as storesSchema from './stores.schema';

export * from './orgs.schema';
export * from './stores.schema';

export const schema = {
	orgs: orgsSchema.orgs,
	stores: storesSchema.stores
};
