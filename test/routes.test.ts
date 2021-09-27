import knex from '../app/shared/db'
import withApp from './withApp'

test(
  'person test',
  withApp(async (app, trx) => {
    await app.inject({
      method: 'GET',
      url: '/',
    })
    const res = await trx('person').count('id')
    expect(res[0].count).toEqual('1')
  })
)

afterAll(async () => {
  await knex.destroy()
})
