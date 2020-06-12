export const STAGE_LINK = (u: any) => `/dashboard/${u.appId}/${u.stage}`
export const CONTENT_LINK = (u: any) => `${STAGE_LINK(u)}/content/${u.section}/${u.model}`
export const CREATE_ENTRY_LINK = (u: any) => `${STAGE_LINK(u)}/create/${u.section}/${u.model}`
export const EDIT_ENTRY_LINK = (u: any) => `${STAGE_LINK(u)}/edit/${u.section}/${u.model}`
export const SCHEMA_LINK = (u: any) => `${STAGE_LINK(u)}/schema/${u.section}/${u.model}`
