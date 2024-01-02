interface ILog {
  _id?: string
  user: string | undefined
  event: string
  detail?: string
  createdAt?: Date
  updatedAt?: Date
}

export {
  ILog
}
