import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { error } from '@/lib/error'

const buildAppNotFoundError = (id: string) => error.build({
  message: `App com id ${id} não encontrado!`,
  statusCode: 412,
  type: ErrorTypesEnum.APP_NOT_FOUND
})

const appErrors = {
  buildAppNotFoundError
}

export {
  appErrors
}
