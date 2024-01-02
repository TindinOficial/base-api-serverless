import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { error } from '@/lib/error'

const loginError = () => error.build({
  type: ErrorTypesEnum.INVALID_PASSWORD_OR_EMAIL,
  statusCode: 401,
  message: 'Erro ao fazer login'
})

const authErrors = {
  loginError
}

export {
  authErrors
}
