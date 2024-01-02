import { IUser } from '@/types/IUser'
import { CollectionsEnum } from '@/types/TableEnum'
import { model, Schema, models } from 'mongoose'
import { isEmail } from 'validator'
import { mongooseErrorValidator } from '@/lib/mongooseErrorValidator'

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name']
  },
  email: {
    type: String,
    unique: true,
    validate: [isEmail, '{VALUE} não é um email válido'],
    sparse: true,
    index: true
  },
  password: {
    type: String,
    required: [true, 'password'],
    index: true
  },
  photo: String
}, {
  timestamps: true
})

mongooseErrorValidator(UserSchema)

const User = models.users || model<IUser>(
  CollectionsEnum.Users,
  UserSchema,
  CollectionsEnum.Users
)

export {
  User
}
