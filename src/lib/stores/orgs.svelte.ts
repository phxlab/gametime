import type { SelectOrg } from '$lib/server/db/schema';

class OrgState {
	list = $state<SelectOrg[]>([]);

	set(data: SelectOrg[]) {
		this.list = data;
	}
}

const orgState = new OrgState();

export default orgState;
