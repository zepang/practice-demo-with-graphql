import path from 'path'
import express from 'express'
import helmet from 'helmet'
import compress from 'compression'
import cors from 'cors'

import serviceLoader from './services'
import db from './database'

const services = serviceLoader({
  db
})

const app = express()
const root = path.resolve(__dirname, '../../')
const serviceNames = Object.keys(services)

if (process.env.NODE_ENV === 'production') {
  // helmet缓解跨站攻击 xxs
  app.use(helmet())
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "'data'"]
    }
  }))
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

  app.use(compress())
}

// 允许跨站请求
app.use(cors())

app.use('/', express.static(path.join(root, 'dist/client')))
app.use('/uploads', express.static(path.join(root, 'uploads')))

for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i]
  if (name === 'graphql') {
    services[name].applyMiddleware({ app })
  } else {
    app.use(`/${name}`, services[name])
  }
}

app.listen(8000, () => console.log('Listening on port 8000!'))
