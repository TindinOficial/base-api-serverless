/**
 * @openapi
 * definitions:
 *  LogIntegration:
 *    type: object
 *    properties:
 *      origin:
 *        type: string
 *      metadata:
 *        type: object
 *      detail:
 *        type: string[]
 *      success:
 *        type: boolean
 *      createdAt:
 *        type: string
 *        format: date-time
 *      updatedAt:
 *        type: string
 *        format: date-time
 */
interface ILogIntegration {
  _id?: string
  origin: string
  metadata: object
  detail: string[]
  success: boolean
  createdAt?: Date
  updatedAt?: Date
}

export {
  ILogIntegration
}
