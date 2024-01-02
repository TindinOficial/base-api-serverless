import { logService } from './logService'

const listLogs = async ({ query }) => {
  const { search, page, perPage } = query

  const logs = await logService.list({ search, page, perPage })

  return logs
}

export {
  listLogs
}
