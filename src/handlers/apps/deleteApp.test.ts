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

  await App.create({
    name: 'app de beleza',
    description: 'descricao do app de beleza',
    photo: 'url://icon-img.com/'
  })
}

describe('integration: Delete App', () => {
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
      method: 'DELETE',
      path: `${PATH}/${randomId}`,
      handler: main
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(412)
    expect(error.type).toBe(ErrorTypesEnum.APP_NOT_FOUND)
  })

  it('should return 200 and delete App', async () => {
    // arrange
    const appFound = await App.findOne({ name: 'novo app' })

    const appsSizeBeforeRequest = await App.countDocuments()
    // act
    const response = await request({
      method: 'DELETE',
      path: `${PATH}/${appFound._id}`,
      handler: main
    })

    const appsSizeAfterRequest = await App.countDocuments()

    // assert
    expect(response.statusCode).toBe(200)

    const appRemoved = response.body.app
    expect(appRemoved._id).toBeDefined()
    expect(appRemoved.name).toBe('novo app')

    const appAfterRequest = await App.findOne({ name: 'novo app' })

    expect(appAfterRequest).toBeNull()

    expect(appsSizeBeforeRequest).toBeGreaterThan(appsSizeAfterRequest)
    expect(appsSizeBeforeRequest).toBe(2)
    expect(appsSizeAfterRequest).toBe(1)
  })
})
