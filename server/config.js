require('dotenv').config()

const options = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL,
  secret: process.env.SECRET_JWT || 'secretKey',
  isSocketsEnabled: process.env.ENABLE_SOCKETS
}

export default options
