import { Knex } from 'knex'
import db from './db'

export async function insert(
  tableName: string,
  data: object,
  uow: Knex.Transaction
) {
  await db(tableName)
    .transacting(uow)
    .insert({
      ...data,
    })
}

export async function select(
  tableName: string,
  data: object,
  uow: Knex.Transaction
) {
  await db(tableName)
    .transacting(uow)
    .insert({
      ...data,
    })
}
