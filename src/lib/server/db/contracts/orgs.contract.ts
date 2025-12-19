import type { z } from 'zod';

export type NewOrg = z.infer<typeof import('../zod').insertOrgSchema>;
export type UpdateOrg = z.infer<typeof import('../zod').updateOrgSchema>;
export type SelectOrg = z.infer<typeof import('../zod').selectOrgSchema>;
export type SelectOrgWithStore = z.infer<typeof import('../zod').selectOrgWithStoreSchema>;
export type OrgsResponse = z.infer<typeof import('../zod').OrgsResponse>;
