import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { error } from '@/lib/error'

const uniqueEmailError = email => {
  return error.build({
    message: `O email ${email} já existe`,
    statusCode: 422,
    type: ErrorTypesEnum.EMAIL_ALREADY_EXISTS
  })
}

const buildUserNotFoundError = user => {
  return error.build({
    message: `Usuário ${user} não encontrado!`,
    statusCode: 412,
    type: ErrorTypesEnum.USER_NOT_FOUND
  })
}

const buildEmailNotInformedError = () => {
  return error.build({
    message: 'O email não foi informado!',
    statusCode: 422,
    type: ErrorTypesEnum.EMAIL_NOT_INFORMED
  })
}

const buildWrongPasswordError = () => error.build({
  message: 'Senha incorreta!',
  statusCode: 412,
  type: ErrorTypesEnum.WRONG_PASSWORD
})

const buildPasswordNotInformedError = () => error.build({
  message: 'Senha não informada!',
  statusCode: 422,
  type: ErrorTypesEnum.PASSWORD_NOT_INFORMED
})

const userErrors = {
  uniqueEmailError,
  buildUserNotFoundError,
  buildPasswordNotInformedError,
  buildWrongPasswordError,
  buildEmailNotInformedError
}

export {
  userErrors
}
