
interface IHelp {
  _id?: string
  title: { [key: string]: any } | string
  description: { [key: string]: any } | string
  cover?: string
  url?: string
  totalViews?: number
  createdAt?: Date
  updatedAt?: Date
}

export {
  IHelp
}
