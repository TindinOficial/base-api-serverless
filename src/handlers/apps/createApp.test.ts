import { request, disconnect, connect, buildMasterUser } from '@/lib/test'
import { main } from './handler'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { IApp } from '@/types/IApp'

const PATH = '/apps'

describe('integration: Create App', () => {
  beforeAll(async () => {
    await connect(__filename)
    await buildMasterUser()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 422 and INVALID_SCHEMA error when screenshot is not informed', async () => {
    // arrange
    const app = {
      name: 'Novo app',
      description: 'Descrição do app'
    }

    // act
    const response = await request({
      method: 'POST',
      path: PATH,
      body: app,
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(422)
    expect(error.type).toBe(ErrorTypesEnum.INVALID_SCHEMA)
  })

  it('should return 200 on create app', async () => {
    // arrange
    const newApp: IApp = {
      name: 'title test',
      description: 'description test',
      photo: 'url://icon-img.com/'
    }
    // act
    const response = await request({
      method: 'POST',
      path: PATH,
      body: newApp,
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)
    const app = response.body.app

    expect(app._id).toBeDefined()
    expect(app.name).toBe('title test')
  })
})
