interface IUser {
  _id?: string
  name: string
  email?: string
  password: string
  photo?: string
  createdAt?: Date
  updatedAt?: Date
}

export {
  IUser
}
