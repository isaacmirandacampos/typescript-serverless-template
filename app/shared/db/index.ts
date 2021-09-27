import knex from 'knex'

export default knex({
  client: 'pg',
  connection:
    process.env.NODE_ENV !== 'test'
      ? process.env.DB_CONNECTION
      : process.env.DB_CONNECTION_TEST,
})
