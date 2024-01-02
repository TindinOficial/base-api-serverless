import { getHealthService } from '@/handlers/healthCheck/healthCheckService'

const getHealthCheck = async () => {
  const healthCheck = await getHealthService.getApplicationHealth()

  return healthCheck
}

export {
  getHealthCheck
}
