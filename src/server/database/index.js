import Sequelize from 'sequelize'
import configFile from '../config'
import getModels from '../models'

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]
const sequelize = new Sequelize(config.database, config.user, config.password, config)
const models = getModels(sequelize)

export default {
  ...models,
  sequelize,
  Sequelize
}
