import { Knex } from 'knex'
import { FastifyRequest } from 'fastify'
import App from './App'
import db from '../shared/db'

const app = new App()

interface Request extends FastifyRequest {
  uow?: Knex.Transaction
}

app.server.addHook('preHandler', (req: Request, _reply: any, done: any) => {
  db.transaction((trx: Knex.Transaction) => {
    req.uow = trx
    done()
  }).catch(done)
})

app.server.addHook('onResponse', (req: Request, _reply: any, done: any) => {
  if (req.uow) {
    req.uow.commit()
  }
})

app.server.addHook('onError', (req: Request, _reply: any, done: any) => {
  if (req.uow) {
    req.uow.rollback()
  }
})

if (require.main === module) {
  app.server.listen(3000, () => {
    console.log('server listening on 3000')
  })
}

export default app.server
