import { buildRouter, buildHandler } from '@/lib/router'
import { authUser } from './authUser'

const router = buildRouter()

router.post('/auth', authUser)

const main = buildHandler(router)

export {
  main
}
