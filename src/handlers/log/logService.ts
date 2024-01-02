import { Log } from '@/models/logModel'
import { ILog } from '@/types/ILog'
import { logErrors } from './logErrors'

const create = async (data: ILog) => {
  const logDb = await Log.create(data)

  try {
    return logDb
  } catch (err) {
    return {}
  }
}

const add = async (user, event, detail) => {
  const log: ILog = {
    user,
    event,
    detail
  }

  return create(log)
}

const findById = async (logId: string) => {
  const log = await Log.findById(logId)

  if (!log) {
    throw logErrors.buildLogNotFoundError(logId)
  }

  return log
}

const list = async ({ search = '', page = 1, perPage = 50 }) => {
  const maxPages = Math.min(+perPage, 50)
  const skip = (+page - 1) * +perPage

  const filter = {
    event: { $regex: search }
  }
  const totalSize = await Log.countDocuments(filter)

  const logs = await Log.find(filter)
    .skip(skip)
    .limit(maxPages)

  return { logs, totalSize }
}

const logService = {
  create,
  add,
  list,
  findById
}

export {
  logService
}
