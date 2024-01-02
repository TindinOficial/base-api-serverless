import { appService } from './appService'

const getApp = async ({ params, user }) => {
  const { appId } = params

  const app = await appService.findById(appId, user)

  return { app }
}

export {
  getApp
}
