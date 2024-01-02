
import { config } from '@/config'
import * as mongoose from 'mongoose'

let conn: any = null

const connect = async (connectOptions?: mongoose.ConnectOptions) => {
  const mongoConfig: mongoose.ConnectOptions = {
    ignoreUndefined: true,
    autoIndex: false,
    autoCreate: false,
    maxPoolSize: 1,
    ...connectOptions
  }

  await mongoose.set('strictQuery', true)

  if (!config.IS_TEST && !conn) {
    conn = await mongoose.connect(config.DATABASE_URL, mongoConfig)
  }

  return conn
}

const disconnect = async () => {
  if (!config.IS_LOCAL && !config.IS_TEST) {
    await mongoose.disconnect()
  }
}

const disconnectWith = async (connect: any) => {
  if (!config.IS_LOCAL && !config.IS_TEST) {
    await connect.connection.close()
    conn = null
  }
}

export {
  connect,
  disconnect,
  disconnectWith
}
