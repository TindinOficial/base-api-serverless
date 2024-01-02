import { authService } from '@/handlers/auth/authService'

const authUser = async ({ body }) => {
  const { user, token } = await authService.auth(body)

  return {
    user,
    token
  }
}

export {
  authUser
}
