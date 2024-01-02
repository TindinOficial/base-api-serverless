import { auth } from '@/lib/auth'
import { buildRouter, buildHandler } from '@/lib/router'
import { createApp } from './createApp'
import { removeApp } from './deleteApp'
import { getApp } from './getApp'
import { listApps } from './listApps'
import { updateApp } from './updateApp'

const router = buildRouter()

router.post('/apps', auth.verifyLogged(createApp))
router.get('/apps/{appId}', auth.verifyLogged(getApp))
router.put('/apps', auth.verifyLogged(updateApp))
router.get('/apps', auth.verifyLogged(listApps))
router.delete('/apps/{appId}', auth.verifyLogged(removeApp))

const main = buildHandler(router)

export {
  main
}
