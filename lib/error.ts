import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { i18n } from './i18n'
import { MESSAGES } from './i18n/error_messages.json'

const build = (options, params?) => {
  const error = new Error()

  return {
    ...error,
    message: options.message,
    // stack: error.stack,
    type: options.type,
    statusCode: options.statusCode,
    params
  }
}

const buildSchemaValidationError = originalError => {
  if (originalError.errors) {
    const keyErrors = Object.keys(originalError.errors)
    const errorMessages = keyErrors.map(keyError => originalError.errors[keyError])
    const finalMessage = errorMessages.map(fildName => i18n.get(MESSAGES.SCHEMA_VALIDATION_ERROR, {
      fieldName: fildName.message
    }))

    originalError.message = finalMessage
  }

  originalError.type = ErrorTypesEnum.INVALID_SCHEMA
  originalError.statusCode = 422
  return originalError
}

const buildInvalidUpdateInputError = originalError => {
  if (originalError.errors) {
    const keyErrors = Object.keys(originalError.errors)
    const errorMessages = keyErrors.map(keyError => originalError.errors[keyError])
    const finalMessage = errorMessages.map(fildName => i18n.get(MESSAGES.UPDATE_VALIDATION_ERROR, {
      fieldName: fildName.path,
      value: fildName.value
    }))

    originalError.message = finalMessage
  }

  originalError.type = ErrorTypesEnum.INVALID_UPDATE_INPUT
  originalError.statusCode = 422
  return originalError
}

const buildNotAuthorizedError = (msg = i18n.get(MESSAGES.NOT_AUTHORIZED_ERROR)) => {
  const error = new Error()
  return {
    ...error,
    message: msg,
    stack: error.stack,
    type: ErrorTypesEnum.NOT_AUTHORIZED,
    statusCode: 401
  }
}

const buildDependencyFailedError = (msg = i18n.get(MESSAGES.DEPENDENCY_FAILED)) => {
  const error = new Error()
  return {
    ...error,
    message: msg,
    stack: error.stack,
    type: ErrorTypesEnum.DEPENDENCY_FAILED,
    statusCode: 424
  }
}

const buildUserNotSessionOwner = () => error.build({
  message: i18n.get(MESSAGES.USER_NOT_SESSION_OWNER),
  statusCode: 412,
  type: ErrorTypesEnum.USER_NOT_SESSION_OWNER
})

const buildSomethingWentWrongInGameError = () => error.build({
  message: i18n.get(MESSAGES.SOMETHING_WENT_WRONG_IN_GAME),
  statusCode: 412,
  type: ErrorTypesEnum.SOMETHING_WENT_WRONG_IN_GAME
})

const buildNotImplemented = () => error.build({
  message: i18n.get(MESSAGES.NOT_IMPLEMENTED),
  statusCode: 412,
  type: ErrorTypesEnum.NOT_IMPLEMENTED
})

const buildUserNotHasPartner = () => error.build({
  message: i18n.get(MESSAGES.NOT_HAS_PARTNER),
  statusCode: 412,
  type: ErrorTypesEnum.NOT_AUTHORIZED
})

const error = {
  build,
  buildSchemaValidationError,
  buildInvalidUpdateInputError,
  buildNotAuthorizedError,
  buildDependencyFailedError,
  buildUserNotSessionOwner,
  buildSomethingWentWrongInGameError,
  buildNotImplemented,
  buildUserNotHasPartner
}

export {
  error
}
