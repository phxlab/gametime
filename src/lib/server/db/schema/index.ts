import * as orgsSchema from './orgs.schema';
import * as storesSchema from './stores.schema';
import * as relationsSchema from './relations';

export * from './orgs.schema';
export * from './stores.schema';
export * from './relations';

export const schema = {
	orgs: orgsSchema.orgs,
	stores: storesSchema.stores,
	orgsRelations: relationsSchema.orgsRelations,
	storesRelations: relationsSchema.storesRelations
};
