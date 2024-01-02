import { model, models, Schema } from 'mongoose'

import { AppStatusEnum } from '@/types/AppTypesEnum'
import { CollectionsEnum } from '@/types/TableEnum'
import { IApp } from '@/types/IApp'
import { mongooseErrorValidator } from '@/lib/mongooseErrorValidator'

const AppSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name']
  },
  description: {
    type: String
  },
  photo: {
    type: String,
    required: [true, 'photo']
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRating: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: AppStatusEnum,
    default: AppStatusEnum.DRAFT
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  id: false
})

mongooseErrorValidator(AppSchema)

const App = models.apps || model<IApp>(
  CollectionsEnum.Apps,
  AppSchema,
  CollectionsEnum.Apps
)

export {
  App
}
