import { createHash, randomBytes } from 'crypto'

const encode = (content: string = '', algorithm = 'sha1') =>
  createHash(algorithm).update(content).digest('hex')

const randomHash = (bytes = 4) => {
  return randomBytes(bytes).toString('hex')
}
const randomPassword = () => {
  return randomBytes(20).toString('hex')
}

const hash = {
  encode,
  randomHash,
  randomPassword
}

export {
  hash
}
