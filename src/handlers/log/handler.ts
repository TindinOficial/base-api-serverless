import { auth } from '@/lib/auth'
import { buildRouter, buildHandler } from '@/lib/router'
import { listLogs } from './listLogs'
import { getLog } from './getLog'

const router = buildRouter()

router.get('/system/logs', auth.verifyLogged(listLogs))
router.get('/system/logs/{logId}', auth.verifyLogged(getLog))

const main = buildHandler(router)

export {
  main
}
