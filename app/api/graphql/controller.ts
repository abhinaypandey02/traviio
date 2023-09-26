import { NextRequest, NextResponse } from 'next/server'

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
export async function middleware(req: NextRequest, res: any) {
  // new NextResponse('', { status: 500, headers: { 'Set-Cookie': 'coo=coooo' } })
  return {}
}
export default resolvers
