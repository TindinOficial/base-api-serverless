import { request, disconnect, connect, buildMasterUser } from '@/lib/test'
import { main } from './handler'
import { App } from '@/models/appModel'

const PATH = '/apps'

const createArrange = async () => {
  const amount = 5

  for (let index = 0; index < amount; index++) {
    await App.create({
      name: `app de arte ${index}`,
      description: `descrição do app de arte ${index}`,
      photo: 'url://icon-img.com/'
    })
  }
}

describe('integration: List apps', () => {
  beforeAll(async () => {
    await connect(__filename)
    await buildMasterUser()
    await createArrange()
  })

  afterAll(async () => {
    await disconnect(__filename)
  })

  it('should return 200 and list Apps', async () => {
    // arrange

    // act
    const response = await request({
      method: 'GET',
      path: PATH,
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)

    const apps = response.body.apps
    const totalSize = response.body.totalSize

    expect(apps.length).toBe(totalSize)
    expect(apps.length).toBe(5)
    expect(totalSize).toBe(5)
  })

  it('should return 200 and list Apps with fields', async () => {
    // arrange

    // act
    const response = await request({
      method: 'GET',
      path: PATH,
      query: {},
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)

    const apps = response.body.apps
    const totalSize = response.body.totalSize

    expect(apps.length).toBe(totalSize)
    expect(apps.length).toBe(5)
    expect(totalSize).toBe(5)

    for (let index = 0; index < totalSize; index++) {
      expect(apps[index].name).toBe(`app de arte ${index}`)
      expect(apps[index].photo).toBe('url://icon-img.com/')
    }
  })

  it('should return 200 and list Apps with filter', async () => {
    // arrange

    // act
    const response = await request({
      method: 'GET',
      path: PATH,
      query: {
        search: 'arte 3'
      },
      handler: main
    })

    // assert
    expect(response.statusCode).toBe(200)

    const apps = response.body.apps
    const totalSize = response.body.totalSize

    expect(apps.length).toBe(totalSize)
    expect(apps.length).toBe(1)
    expect(totalSize).toBe(1)
  })
})
