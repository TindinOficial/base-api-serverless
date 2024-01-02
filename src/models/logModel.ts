import { ILog } from '@/types/ILog'
import { CollectionsEnum } from '@/types/TableEnum'
import { model, Schema, models } from 'mongoose'
import { User } from './userModel'
import { mongooseErrorValidator } from '@/lib/mongooseErrorValidator'

const LogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User.collection.collectionName,
    required: [true, 'user'],
    index: true
  },
  event: {
    type: String,
    required: [true, 'event']
  },
  detail: {
    type: String
  }
}, {
  timestamps: true
})

mongooseErrorValidator(LogSchema)

const Log = models.logs || model <ILog>(
  CollectionsEnum.Logs,
  LogSchema,
  CollectionsEnum.Logs
)

export {
  Log
}
