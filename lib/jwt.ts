import { config } from '@/config'
import { sign, verify as verifyJwt } from 'jsonwebtoken'

const create = (data, options = {}) =>
  sign(data, config.JWT_SECRET, options)

const verify = token => {
  try {
    const payload = verifyJwt(token, config.JWT_SECRET)
    return payload
  } catch (e) {
    return null
  }
}

const getData = (token: string) => {
  try {
    const [,data] = token.split('.')
    const rawData = Buffer.from(data, 'base64').toString()
    return JSON.parse(rawData)
  } catch (e) {
    return null
  }
}

const jwt = {
  create,
  verify,
  getData
}

export {
  jwt
}
