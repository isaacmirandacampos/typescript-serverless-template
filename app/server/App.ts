import fastify, { FastifyInstance } from 'fastify'
require('dotenv').config()
import routes from './routes'

interface AppInterface {
  server: FastifyInstance
}

class App implements AppInterface {
  server: FastifyInstance
  constructor() {
    this.server = fastify()
    this.middlewares()
    this.routes()
  }

  private middlewares() {}

  private routes() {
    this.server.register(routes)
  }
}

export default App
