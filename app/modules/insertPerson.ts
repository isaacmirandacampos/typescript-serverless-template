import { insert } from '../shared/queries'

export const insertPerson = async (req: any, res: any) => {
  try {
    await insert(
      'person',
      {
        name: 'Unit of Work',
      },
      req.uow
    )
    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(400).send({ message: 'failed request' })
  }
}
