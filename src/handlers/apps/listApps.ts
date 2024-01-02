import { appService } from './appService'

const listApps = async ({ user, query }) => {
  const { search, page, perPage } = query

  const apps = await appService.list({ search, page, perPage }, user)

  return apps
}

export {
  listApps
}
