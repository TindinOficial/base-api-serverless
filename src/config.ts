import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_TEST: process.env.NODE_ENV === 'test',
  IS_LOCAL: process.env.NODE_ENV === 'development',
  JWT_SECRET: process.env.JWT_SECRET ?? '5ce5ecba-608a-4561-932a-05e25b86f672'
}

export { config }
