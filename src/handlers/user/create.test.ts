import { buildMasterUser, connect, disconnect, request, resetAllData } from '@/lib/test'
import { User } from '@/models/userModel'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { main } from './handler'

const PATH = '/users'

describe('integration: create user', () => {
  beforeAll(async () => {
    await connect(__filename)
  })

  beforeEach(async () => {
    await buildMasterUser()
  })

  afterEach(async () => {
    await resetAllData()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  describe('Testing success', () => {
    it('Create user', async () => {
      const response = await request({
        path: PATH,
        method: 'POST',
        handler: main,
        body: {
          name: 'Dorival Junior',
          email: 'dorivaljunior@tindin.com.br',
          password: '123123'
        }
      })

      expect(response.statusCode).toBe(200)

      const userCreated = response.body

      expect(userCreated).toBeDefined()
    })
  })

  describe('Testing errors', () => {
    it('Wrong password', async () => {
      await User.create({
        name: 'Dorival Junior',
        email: 'dorivaljunior@tindin.com.br',
        password: '123123123123'
      })

      const response = await request({
        path: PATH,
        method: 'POST',
        handler: main,
        body: {
          email: 'dorivaljunior@tindin.com.br',
          password: '123123',
          organizationName: 'Org Name',
          teamName: 'Team Name',
          territoryId: '111111111111111111111111'
        }
      })

      expect(response.statusCode).toBe(422)

      const error = response.body
      expect(error.type).toBe(ErrorTypesEnum.EMAIL_ALREADY_EXISTS)
    })
  })
})
