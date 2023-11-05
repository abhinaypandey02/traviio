import { buildSchema } from 'graphql'

import types from './types'

export default buildSchema(`
  ${types.map((type) => type.GQLSchema.type).join('\n')}
  type Query {
    ${types.map((type) => type.GQLSchema.query).join('\n')}
  }
  type Mutation {
    ${types.map((type) => type.GQLSchema.mutation).join('\n')}
  }
`)
