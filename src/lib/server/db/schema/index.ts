import { orgs } from './orgs.schema';
import { stores } from './stores.schema';
import { items } from './items.schema';
import * as relationsSchema from '../relations';

export { orgs, stores, items };

export const schema = {
	orgs,
	stores,
	items,
	...relationsSchema
};
