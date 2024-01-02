import { appService } from './appService'

const removeApp = async ({ params, user }) => {
  const { appId } = params

  const app = await appService.remove(appId, user)

  return { app }
}

export {
  removeApp
}
