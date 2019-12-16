import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import resolver from './resolvers'
import Schema from './schema'

export default (utils) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: resolver(utils)
  })

  const server = new ApolloServer({
    schema: executableSchema,
    context: ({ req }) => req
  })

  return server
}
