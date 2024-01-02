import { config } from '@/config'
import * as pino from 'pino'

const logger = pino({
  prettyPrint: !config.IS_PRODUCTION
})

const buildLogger = logger.child

const debugLogger = logger.child({ DEBUG_CARDS: 'DEBUG_CARDS' })

export {
  buildLogger,
  debugLogger
}
