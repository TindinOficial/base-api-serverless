import { buildRouter, buildHandler } from '@/lib/router'
import { create } from './create'

const router = buildRouter()

router.post('/users', create)
const main = buildHandler(router)

export {
  main
}
