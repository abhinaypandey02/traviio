import types from './types'

let resolvers = {
  Query: {},
  Mutation: {},
}

types.forEach((type) => {
  const typeWithName: { [key: string]: {} } = {}
  typeWithName[type.name] = type.GQLResolvers.type
  resolvers = {
    ...resolvers,
    ...typeWithName,
    Query: { ...resolvers.Query, ...type.GQLResolvers.query },
    Mutation: { ...resolvers.Mutation, ...type.GQLResolvers.mutation },
  }
})
export default resolvers
