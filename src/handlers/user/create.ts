import { userService } from './userService'

const create = async ({ body }) => {
  const response = await userService.create(body)

  return response
}

export {
  create
}
