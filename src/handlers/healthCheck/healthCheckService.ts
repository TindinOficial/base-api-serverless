import { version, name } from '@/package'
import { connection } from 'mongoose'

const getApplicationHealth = async () => {
  const today = new Date()
  const start = Date.now()
  const status = await getMongoHealth()
  const duration = Date.now() - start

  const healthChecked = {
    name: name,
    version: version,
    status: true,
    date: `${today.getDate()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`, // Data e horário atual
    duration,
    integrations: {
      database: {
        name: 'database integration',
        id: 'db',
        status,
        response_time: `${duration} mls`
      }
    }
  }

  return healthChecked
}

const getMongoHealth = async () => {
  return connection.readyState === 1 ? 'UP' : 'DOWN'
}

const getHealthService = {
  getApplicationHealth
}

export {
  getHealthService
}
