/* eslint-disable no-console */
import { error } from '@/lib/error'
import * as mongoose from 'mongoose'

const mongooseErrorValidator = (schema) => {
  const changeToInvalidSchemaError = (err: mongoose.Error.ValidationError, _: any, next: (arg0?: any) => void) => {
    if (err) {
      return next(error.buildInvalidUpdateInputError(err))
    }
    return next()
  }

  const catchInvalidSchema = (err: mongoose.Error.ValidationError, _: any, next: (arg0?: any) => void) => {
    if (err) {
      return next(error.buildSchemaValidationError(err))
    }
    return next()
  }

  schema.post('validate', catchInvalidSchema)
  schema.post('findOneAndUpdate', changeToInvalidSchemaError)
}

export {
  mongooseErrorValidator
}
