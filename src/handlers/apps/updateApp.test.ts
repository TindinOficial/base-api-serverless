import { request, disconnect, connect, buildMasterUser } from '@/lib/test'
import { main } from './handler'
import { ErrorTypesEnum } from '@/types/ErrorTypesEnum'
import { App } from '@/models/appModel'

const PATH = '/apps'

const createArrange = async () => {
  await App.create({
    name: 'novo app',
    description: 'descrição do novo app',
    photo: 'url://icon-img.com/',
    rating: 4,
    totalRating: 2
  })
}

describe('integration: Update App', () => {
  beforeAll(async () => {
    await connect(__filename)
    await buildMasterUser()
    await createArrange()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 422 and APP_NOT_FOUND error when app is not found', async () => {
    // arrange
    const randomId = '6228db4cfb2a1ab7debe4afa'
    // act
    const response = await request({
      method: 'PUT',
      path: PATH,
      body: {
        _id: randomId,
        name: 'app updated',
        description: 'new description of updated app'
      },
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(412)
    expect(error.type).toBe(ErrorTypesEnum.APP_NOT_FOUND)
  })

  it('should return 422 and INVALID_SCHEMA error when _id is not informed', async () => {
    // arrange

    // act
    const response = await request({
      method: 'PUT',
      path: PATH,
      body: {
        name: 'app updated',
        description: 'new description of updated app'
      },
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(422)
    expect(error.type).toBe(ErrorTypesEnum.INVALID_SCHEMA)
  })

  it('should return 200 and update App', async () => {
    // arrange
    const appFound = await App.findOne({ name: 'novo app' })
    // act
    const response = await request({
      method: 'PUT',
      path: PATH,
      body: {
        _id: appFound._id,
        name: 'app updated',
        description: 'new description of updated app'
      },
      handler: main
    })

    // assert

    expect(response.statusCode).toBe(200)
    const app = response.body.app
    expect(app._id).toBeDefined()
    expect(app.name).toBe('app updated')
    expect(app.description).toBe('new description of updated app')
  })
})
