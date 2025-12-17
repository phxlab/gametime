import { orgs } from './orgs.schema';
import { stores } from './stores.schema';
import * as relationsSchema from '../relations';

export { orgs, stores };

export const schema = {
	orgs,
	stores,
	...relationsSchema
};
