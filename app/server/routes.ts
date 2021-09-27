import fastify, {
  FastifyInstance,
  RouteOptions,
  HookHandlerDoneFunction,
} from 'fastify'
import { insertPerson } from '../modules/insertPerson'

export default function (
  fastify: FastifyInstance,
  _opts: RouteOptions,
  next: HookHandlerDoneFunction
) {
  fastify.get('/', insertPerson)
  next()
}
