import { FastifyInstance } from 'fastify'
import { Knex } from 'knex'
import App from '../app/server/App'
import knex from '../app/shared/db'

const withApp =
  (callback: (app: FastifyInstance, trx: Knex.Transaction) => void) =>
  async () => {
    const app = new App().server

    await knex.transaction(async (trx) => {
      app.addHook('preHandler', (req: any, _reply: any, done: any) => {
        req.uow = trx
        done()
      })
      try {
        await callback(app, trx)
        await trx.rollback()
      } finally {
        app.close()
      }
    })
  }

export default withApp
