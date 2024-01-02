import { userService } from '@/handlers/user/userService'
import { error } from './error'
import { jwt } from './jwt'

const TOKEN_HEADER_KEY = 'x-api-key'

const parseUserPayload = (event) => {
  const token = event.headers[TOKEN_HEADER_KEY]
  const user = jwt.verify(token) as any
  if (!user) {
    throw error.buildNotAuthorizedError()
  }

  return user
}

const authUser = async (event) => {
  const payload = parseUserPayload(event)
  const user = await userService.findById(payload.user_id)

  return user
}

const authToken = async (event) => {
  const payload = parseUserPayload(event)
  const user = await userService.findById(payload.user_id)

  return user
}

const verifyContext = async (event) => {
  const user = await authUser(event)
  event.user = user
}

const verifyLogged = (handler) => async (event, ...rest) => {
  const user = await authToken(event)
  event.user = user

  return handler(event, ...rest)
}

const auth = {
  verifyLogged,
  verifyContext,
  parseUserPayload,
  TOKEN_HEADER_KEY
}

export {
  auth
}
