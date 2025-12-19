import type { OrgsResponse } from '$lib/server/db/contracts';

class OrgState {
	list = $state<OrgsResponse>([]);

	set(data: OrgsResponse) {
		this.list = data;
	}
}

const orgState = new OrgState();

export default orgState;
