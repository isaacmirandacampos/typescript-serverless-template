import { Knex } from 'knex'
import awsLambdaFastify from 'aws-lambda-fastify'

import { FastifyRequest, FastifyReply } from 'fastify'
import App from './App'
import db from '../shared/db'

const app = new App()

interface Request extends FastifyRequest {
  uow?: Knex.Transaction
}

app.server.addHook(
  'preHandler',
  (req: Request, _reply: FastifyReply, done: any) => {
    db.transaction((trx: Knex.Transaction) => {
      req.uow = trx
      done()
    }).catch(done)
  }
)

app.server.addHook('onResponse', async (req: Request, reply: FastifyReply) => {
  if (req.uow && reply.statusCode === 200) {
    req.uow.commit()
  }
})

app.server.addHook('onError', async (req: Request, _reply: FastifyReply) => {
  if (req.uow) {
    req.uow.rollback()
  }
})

if (require.main === module) {
  app.server.listen(3000, () => {
    console.log('server listening on 3000')
  })
}

const proxy: any = awsLambdaFastify(app.server)

export const lambdaHandler = async (event: any, context: any) =>
  proxy(event, context)
