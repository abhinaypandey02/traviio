import { NextRequest, NextResponse } from 'next/server'
import { JWTPayload } from 'jose'
import jwt from 'jsonwebtoken'

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
  const bearer = req.headers.get('authorization')
  if (bearer) {
    const token = bearer.slice(7)
    try {
      const res = jwt.verify(token, process.env.SIGNING_KEY!) as JWTPayload
      return { userId: res.id }
    } catch (e) {
      return {}
    }
  }
  return {}
}
export default resolvers
