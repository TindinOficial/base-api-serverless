import axios, { AxiosResponse } from 'axios'
import { i18n } from './i18n'
import { MESSAGES } from './i18n/error_messages.json'

enum AXIOS_TYPE_STATUS_ERRORS {
  INTERNAL_SERVER_ERROR_502 = 'INTERNAL_SERVER_ERROR_502',
  AXIOS_REQUEST_ERROR = 'AXIOS_REQUEST_ERROR'
}

const buildErrorsByStatus = (response) => {
  const { status, data } = response

  const handleError = {
    ...data,
    statusCode: status,
    type: AXIOS_TYPE_STATUS_ERRORS.AXIOS_REQUEST_ERROR
  }

  const build = {
    502: () => ({
      ...handleError,
      type: AXIOS_TYPE_STATUS_ERRORS.INTERNAL_SERVER_ERROR_502,
      message: i18n.get(MESSAGES.INTERNAL_SERVER_ERROR)
    }),
    default: () => handleError
  }

  return build[status]?.() ?? build.default()
}

axios.interceptors.response.use((response: AxiosResponse<any>) => response,
  async ({ response }) => {
    return Promise.reject(buildErrorsByStatus(response))
  }
)

export default axios
