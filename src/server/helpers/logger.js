import winston from 'winston'

const transports = [
  new winston.transports.File({
    filename: 'error.log',
    level: 'error'
  }),
  new winston.transports.File({
    filename: 'combined.log',
    level: 'verbose'
  })
]

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

export default logger
