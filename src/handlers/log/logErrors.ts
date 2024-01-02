import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { error } from '@/lib/error'

const buildLogNotFoundError = (id: string) => error.build({
  message: `Log com id ${id} não encontrado!`,
  statusCode: 412,
  type: ErrorTypesEnum.LOG_NOT_FOUND
})

const logErrors = {
  buildLogNotFoundError
}

export {
  logErrors
}
