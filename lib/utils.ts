import { customAlphabet } from 'nanoid'

const isNumber = (value) => {
  return (isFinite(value) && typeof value === 'number')
}

const isObject = (value: any) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const isObjectEmpty = (value: any) => {
  return !!(!isObject(value) || !Object.values(value)?.length)
}

const toSnakeCase = (str: string) => {
  return str.replace(/\d+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_')
}

const toFixedNumber = (value: number, places: number) => {
  if (isNumber(value)) {
    places = (places >= 0) ? places : 0

    return Number.parseFloat(value.toFixed(places))
  }

  return value
}

const removeDuplicateDataInArrayOfObjects = (objects: object[]) => {
  return Array.from(new Set(objects.map(obj => JSON.stringify(obj)))).map((obj) => JSON.parse(obj))
}

const wordIncludeInString = (str, word) => str.split(/\s+/).includes(word)

const turnNumberIntoNegative = (value) => {
  const asNumber = utils.isNumber(value) ? value : 0
  return Math.abs(asNumber) * -1
}

const buildCustomUniqueId = async () => {
  const id = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)().toLowerCase()
  const randomTimestamp = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString()

  return id.concat(randomTimestamp)
}

const getVerifierAndChallengeCode = async () => {
  return new Promise((resolve) => {
    resolve({ verifier: 'b6e4e8536619f4189fa7219647b6fcc4b854efd88c79b489bda1113e', challenge: 'bWLOXG3zFbcM4YvcG2j_bMSeDAbiR68kvqZ9ZZUv6rU' })
  })
}
const sleep = (ms: number, cb = () => {}) => setTimeout(cb, ms)

const removeBeginAndEndSpaceFromString = (str: string) => {
  const spaceBeginEndRegex = /^\s+|\s+$/g

  return str.replace(spaceBeginEndRegex, '')
}
const sleepAsync = async (ms: number, cb = () => {}) => new Promise((resolve) => setTimeout(() => {
  resolve(cb())
}, ms))

const utils = {
  isNumber,
  isObject,
  isObjectEmpty,
  toSnakeCase,
  toFixedNumber,
  removeDuplicateDataInArrayOfObjects,
  wordIncludeInString,
  turnNumberIntoNegative,
  buildCustomUniqueId,
  getVerifierAndChallengeCode,
  sleep,
  removeBeginAndEndSpaceFromString,
  sleepAsync
}

export {
  utils
}
