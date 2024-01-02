import { error } from '@/lib/error'
import { App } from '@/models/appModel'
import { IUser } from '@/types/IUser'
import { IApp } from '@/types/IApp'
import { logService } from '../log/logService'
import { appErrors } from './appErrors'

const create = async (data: IApp, user: IUser) => {
  delete data.rating
  delete data.totalRating

  const app = await App.create(data)

  await logService.create({
    user: user._id,
    event: 'Criar app',
    detail: `App com id ${app._id} criado com sucesso!`
  })

  return app
}

const findById = async (appId: string, user: IUser) => {
  const app = await App.findById(appId)

  if (!app) {
    throw appErrors.buildAppNotFoundError(appId)
  }

  await logService.create({
    user: user._id,
    event: 'Obter app',
    detail: `App obtido com o id ${appId}`
  })

  return app
}

const update = async ({ _id, ...body }, user: IUser) => {
  if (!_id) {
    throw error.buildSchemaValidationError({
      message: 'ID do app não foi informado!'
    })
  }

  delete body.totalRating

  const updatedApp = await App.findByIdAndUpdate(_id, body, { new: true })

  if (!updatedApp) {
    throw appErrors.buildAppNotFoundError(_id)
  }

  await logService.create({
    user: user._id,
    event: 'Alterar app',
    detail: `App com id ${_id} alterado com sucesso!`
  })

  return updatedApp
}

const list = async ({ search, page = 1, perPage = 50 }, user) => {
  const maxPages = Math.min(+perPage, 50)
  const skip = (+page - 1) * +perPage
  const filter = {
    name: new RegExp(search, 'i')
  }

  const apps = await App.find(filter)
    .skip(skip)
    .limit(maxPages)

  const totalSize = await App.countDocuments(filter)

  await logService.create({
    user: user._id,
    event: 'Listar apps',
    detail: 'Foi listado os apps!'
  })

  return { apps, totalSize }
}

const remove = async (appId: string, user: IUser) => {
  const app = await App.findById(appId)

  if (!app) {
    throw appErrors.buildAppNotFoundError(appId)
  }

  const removedApp = await App.findByIdAndRemove(appId)

  await logService.create({
    user: user._id,
    event: 'Remover app',
    detail: `O app com id ${appId} foi removido com sucesso!`
  })

  return removedApp
}

const appService = {
  create,
  findById,
  update,
  list,
  remove
}

export {
  appService
}
