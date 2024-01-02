import { getHealthCheck } from './getHealthCheck'
import { buildRouter, buildHandler } from '@/lib/router'

const router = buildRouter()

router.get('/health-check', getHealthCheck)

const main = buildHandler(router)

export {
  main
}
