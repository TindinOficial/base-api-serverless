import {
  connection,
  connect as dbConnect
} from 'mongoose'
import { config } from '@/config'
import { auth } from './auth'
import { userService } from '@/handlers/user/userService'
import { User } from '@/models/userModel'
import { CollectionsEnum } from '@/types/TableEnum'
import { hash } from '@/lib/hash'
import { MongoMemoryServer } from 'mongodb-memory-server'

interface EventParams {
  path: string
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  handler: Function
  query?: object
  body?: object
  headers?: object
}

const MEMORY_DATABASE_NAME = 'localhost-memory-database-for-tests'
const MASTER_USER_EMAIL = 'master@tindin.com.br'
const databases: any[] = []

const connect = async (id: string) => {
  const dbName = MEMORY_DATABASE_NAME
  const mongoConfig = {
    ignoreUndefined: true,
    dbName
  }

  const server = await MongoMemoryServer.create({
    instance: {
      dbName
    }
  })

  const databaseURL = await server.getUri()
  const connection = await dbConnect(databaseURL, mongoConfig)
  databases.push({ id, server, connection })
}

const disconnect = async (id: string) => {
  const { server, connection } = databases.find((db) => db.id === id)
  await connection.disconnect()
  await server.stop()
}

const resetAllData = async (collectionsToPreserve: CollectionsEnum[] = []) => {
  const isMemoryTestDatabase = config.IS_TEST && User.db.name.includes(MEMORY_DATABASE_NAME)
  if (!isMemoryTestDatabase) {
    throw new Error(`Se ta doido? Método disponível apenas para o banco em memoria! Atual: ${User.db.name}`)
  }

  const collections = connection.collections
  const colletionsToReset = Object.keys(collections).filter(
    collection => !collectionsToPreserve.includes(collection as CollectionsEnum)
  )

  for (const key of colletionsToReset) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

const resetTestData = async () => {
  const collectionsToPreserve = [
    CollectionsEnum.SystemModules,
    CollectionsEnum.SystemProfilesAccess,
    CollectionsEnum.Users
  ]
  await resetAllData(collectionsToPreserve)
}

const getMasterUser = async () =>
  await userService.findByEmail(MASTER_USER_EMAIL)

const buildMasterUser = async (password: string = '123') => {
  const registeredUser = await getMasterUser()
  if (registeredUser) return { user: registeredUser }

  const user = await User.create({
    name: 'Master User',
    email: MASTER_USER_EMAIL,
    password: hash.encode(password)
  })

  return {
    user
  }
}

const request = async ({
  path,
  method,
  handler,
  query = {},
  body = {},
  headers = {}
}: EventParams) => {
  const { user } = await buildMasterUser()

  const token = await userService.createToken(
    user?._id
  )

  const event = {
    queryStringParameters: query,
    body,
    rawBody: JSON.stringify(body),
    headers: {
      [auth.TOKEN_HEADER_KEY]: token,
      ...headers
    },
    multiValueHeaders: {},
    httpMethod: method,
    isBase64Encoded: false,
    path
  }
  const response = await handler(event)

  return {
    ...response,
    body: JSON.parse(response.body)
  }
}

export {
  request,
  resetAllData,
  resetTestData,
  buildMasterUser,
  connect,
  disconnect
}
