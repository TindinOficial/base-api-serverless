import { hash } from '@/lib/hash'
import { jwt } from '@/lib/jwt'
import { User } from '@/models/userModel'
import { IUser } from '@/types/IUser'
import { userErrors } from './userErrors'
import { customAlphabet } from 'nanoid'

const create = async (data: IUser) => {
  const passHash = hash.encode(data.password)

  const email = data?.email
  if (await findByEmail(email)) {
    throw userErrors.uniqueEmailError(email)
  }

  const user = await User.create({
    ...data,
    password: passHash
  })

  const userDb = user.toObject()

  return userDb
}

const findByEmail = async (email) => await User.findOne({
  email: email
})

const findById = async (userId: string) => {
  const user = await User.findById(userId)

  if (!user) {
    throw userErrors.buildUserNotFoundError(userId)
  }

  return user
}

const createToken = async (userId: string) => jwt.create({ user_id: userId })

const userService = {
  create,
  findById,
  createToken,
  findByEmail,
  customAlphabet
}

export {
  userService
}
