import awsLambdaFastify from 'aws-lambda-fastify'
import main from './main'

const proxy: any = awsLambdaFastify(main)

export const lambdaHandler = async (event: any, context: any) =>
  proxy(event, context)
