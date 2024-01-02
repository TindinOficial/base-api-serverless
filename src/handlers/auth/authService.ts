import { authErrors } from './authErrors'
import { hash } from '@/lib/hash'
import { jwt } from '@/lib/jwt'
import { User } from '@/models/userModel'
import { logService } from '../log/logService'

const createToken = (userId: string) => jwt.create({
  user_id: userId
})

const authenticateUser = async (userId) => {
  const token = createToken(userId)

  const userToAuth = (await User.findById(userId).select('-password'))?.toObject({ virtuals: true })

  return {
    user: userToAuth,
    token
  }
}

const auth = async ({ email, password }) => {
  const passHash = hash.encode(password)

  const userToAuth = await User.findOne({
    password: passHash,
    email
  })

  if (!userToAuth) {
    throw authErrors.loginError()
  }

  const { user, token } = await authenticateUser(userToAuth._id)

  await logService.create({
    user: userToAuth._id,
    event: 'User realizou login',
    detail: `Usuário com id ${userToAuth._id} realizou login`
  })

  return {
    user,
    token
  }
}

const authService = {
  authenticateUser,
  createToken,
  auth
}

export {
  authService
}
