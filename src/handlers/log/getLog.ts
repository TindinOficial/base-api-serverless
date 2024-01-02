import { logService } from './logService'

const getLog = async ({ params }) => {
  const { logId } = params

  const log = await logService.findById(logId)

  return { log }
}

export {
  getLog
}
