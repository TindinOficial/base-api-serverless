import { main } from './handler'
import { request, connect, disconnect } from '@/lib/test'
import { IUser } from '@/types/IUser'
import { userService } from '@/handlers/user/userService'

const createUsers = async () => {
  const playerUser: IUser = {
    name: 'Player',
    email: 'player@tindin.com',
    password: '123mudar'
  }

  await userService.create(playerUser)
}

describe('integration:authUser', () => {
  beforeAll(async () => {
    await connect(__filename)
    await createUsers()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 401 and INVALID_PASSWORD_OR_EMAIl error using wrong password', async () => {
    // arrange
    const email = 'admin@tindin.com'
    const password = 'senhaErrada'
    const user = {
      email,
      password
    }

    // act
    const response = await request({
      method: 'POST',
      path: '/auth',
      body: user,
      handler: main
    })

    // assert

    expect(response.statusCode).toBe(401)
  })

  it('should return 200 on Authenticated Player user', async () => {
    // arrange

    const email = 'player@tindin.com'
    const password = '123mudar'
    const user = {
      email,
      password
    }

    // act
    const response = await request({
      method: 'POST',
      path: '/auth',
      body: user,
      handler: main
    })

    // assert
    const authUser = response.body

    expect(response.statusCode).toBe(200)
    expect(authUser.user.email).toBe(user.email)
    expect(authUser.token).toBeDefined()
  })
})
