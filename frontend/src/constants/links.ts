export const STAGE_LINK = (u: any) => ({
  as: `/dashboard/${u.appId}/${u.stage}`,
  href: '/dashboard/[appId]/[stage]'
})

export const CONTENT_LINK = (u: any) => ({
  as: `${STAGE_LINK(u).as}/content/${u.section}/${u.model}`,
  href: `${STAGE_LINK(u).href}/[moduleName]/[section]/[model]`
})

export const CREATE_ENTRY_LINK = (u: any) => ({
  as: `${STAGE_LINK(u)}/create/${u.section}/${u.model}`,
  href: `${STAGE_LINK(u).href}/[moduleName]/[section]/[model]`
})

export const EDIT_ENTRY_LINK = (u: any) => ({
  as: `${STAGE_LINK(u).as}/edit/${u.section}/${u.model}`,
  href: `${STAGE_LINK(u).href}/[moduleName]/[section]/[model]`
})

export const SCHEMA_LINK = (u: any) => ({
  as: `${STAGE_LINK(u).as}/schema/${u.section}/${u.model}`,
  href: `${STAGE_LINK(u).href}/[moduleName]/[section]/[model]`
})
