import { AppStatusEnum } from './AppTypesEnum'

interface IApp {
  _id?: string
  name: { [key: string]: any } | string
  description?: { [key: string]: any } | string
  photo: string
  rating?: number
  totalRating?: number
  status?: AppStatusEnum
  createdAt?: Date
  updatedAt?: Date
}

export {
  IApp
}
