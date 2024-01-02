import { Router } from 'lambda-router'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { connect } from '@/lib/database'
import { APIGatewayProxyResult, Context } from 'aws-lambda'
import { auth } from './auth'
import { i18n } from './i18n'

const buildRouter = () => {
  const router = Router({
    parseBody: true,
    decodeEvent: true,
    includeErrorStack: true
  })

  router.unknown((_event, { response }, path, method) => {
    return response(404, {
      message: `${method} on ${path} not found`
    })
  })

  router.beforeRoute(event => {
    const { pathParameters = {}, queryStringParameters = {}, body } = event
    event.params = pathParameters
    event.query = queryStringParameters
    event.body = body ?? {}
  })

  router.formatError((_statusCode, error) => {
    if (!error.type) {
      error.type = ErrorTypesEnum.UNKNOWN
    }

    return error
  })

  return router
}

const connPromise = connect({ maxPoolSize: 1, minPoolSize: 0, maxIdleTimeMS: 1000 })

const buildHandler = (router, config?) =>
  async (event, context: Context): Promise<APIGatewayProxyResult> => {
    context = context || {}

    await connPromise
    context.callbackWaitsForEmptyEventLoop = false

    if (config?.auth) {
      router.beforeRoute(async event => {
        await auth.verifyContext(event)
      })
    }

    const result = await router.route(event, context)

    const response = i18n.resolve({
      language: event?.headers?.language,
      response: result.response
    })

    return response
  }

export {
  buildRouter,
  buildHandler
}
