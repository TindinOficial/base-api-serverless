import { request, disconnect, connect } from '@/lib/test'

import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { ILog } from '@/types/ILog'

import { logService } from './logService'
import { main } from './handler'

describe('integration:getLog', () => {
  beforeAll(async () => {
    await connect(__filename)
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 412 and LOG_NOT_FOUND error', async () => {
    // arrange
    const invalidLogId = '5ee909e6dd4fb01d6cc17abf'

    // act
    const response = await request({
      method: 'GET',
      path: `/system/logs/${invalidLogId}`,
      handler: main
    })

    // assert
    const error = response.body
    expect(response.statusCode).toBe(412)
    expect(error.type).toBe(ErrorTypesEnum.LOG_NOT_FOUND)
  })

  it('should return Log by Id', async () => {
    // arrange
    const log: ILog = {
      user: '61a8bb8a49e5c17ac66aaad9',
      event: 'Criou um log',
      detail: 'Criou um log com o id 1a8bb8a49e5c17ac66aaad9'
    }

    const createdLog = await logService.create(log)

    // act
    const response = await request({
      method: 'GET',
      path: `/system/logs/${createdLog._id}`,
      handler: main
    })

    const logResponse = response.body.log

    // assert
    expect(response.statusCode).toBe(200)
    expect(logResponse._id.toString()).toBe(createdLog._id.toString())
    expect(logResponse.user.toString()).toBe(createdLog.user.toString())
    expect(logResponse.detail).toBe(createdLog.detail)
    expect(logResponse.event).toBe(createdLog.event)
    expect(logResponse.createdAt).toBeDefined()
    expect(logResponse.updatedAt).toBeDefined()
  })
})
