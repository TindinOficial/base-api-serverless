import { main } from './handler'
import { connect, request, disconnect } from '@/lib/test'

describe('integration:getHealthCheck', () => {
  beforeAll(async () => {
    await connect(__filename)
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 200 and user', async () => {
    // act
    const response = await request({
      method: 'GET',
      path: '/health-check',
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe('api-tindin-base')
    expect(response.body.integrations.database.status).toBe('UP')
  })
})
