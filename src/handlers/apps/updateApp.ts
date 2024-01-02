import { appService } from './appService'

const updateApp = async ({ body, user }) => {
  const app = await appService.update(body, user)

  return { app }
}

export {
  updateApp
}
