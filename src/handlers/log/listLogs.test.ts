import { request, disconnect, connect } from '@/lib/test'
import { ILog } from '@/types/ILog'

import { logService } from './logService'
import { main } from './handler'

const createLogs = async () => {
  const log1: ILog = {
    user: '61b2450cfb54b8ed95cd113f',
    event: 'Criou um log',
    detail: 'Criou um log com o id 61b245406b928e3e638da7d5'
  }

  const log2: ILog = {
    user: '61b2450cfb54b8ed95cd113f',
    event: 'Buscou um log',
    detail: 'Buscou um log com o id 61b245481ca774118378bf41'
  }

  await logService.create(log1)
  await logService.create(log2)
}

describe('integration:listLogs', () => {
  beforeAll(async () => {
    await connect(__filename)
    await createLogs()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return list of Logs', async () => {
    // arrange

    // act
    const response = await request({
      method: 'GET',
      path: '/system/logs',
      handler: main
    })

    // assert
    const logList = response.body.logs
    expect(response.statusCode).toBe(200)
    expect(logList.length).toBeGreaterThanOrEqual(2)
  })
})
