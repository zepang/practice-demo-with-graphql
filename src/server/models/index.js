import fs from 'fs'
import path from 'path'

const basename = path.basename(__filename)

export default function getModels (sequelize) {
  const models = {}
  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file))
      models[model.name] = model
    })

  Object.keys(models).forEach(name => {
    if (models[name].associate) {
      models[name].associate(models)
    }
  })
  return models
}
