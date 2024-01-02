import { connect, disconnect } from '@/lib/test'
import { logService } from './logService'
import { ILog } from '@/types/ILog'

describe('integration:authUser', () => {
  beforeAll(async () => {
    await connect(__filename)
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return log created', async () => {
    // arrange
    const log: ILog = {
      user: '61a8bb8a49e5c17ac66aaad9',
      event: 'Criou um usuário',
      detail: 'Criou um usuário com o id 1a8bb8a49e5c17ac66aaad9'
    }

    // act

    // assert
    const createdLog = await logService.create(log)

    expect(createdLog._id).toBeDefined()
    expect(createdLog.user.toString()).toBe(log.user?.toString())
    expect(createdLog.event).toBeDefined()
    expect(createdLog.detail).toBeDefined()
  })
})
