import { appService } from './appService'

const createApp = async ({ body, user }) => {
  const app = await appService.create(body, user)

  return { app }
}

export {
  createApp
}
