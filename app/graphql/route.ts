import { NextRequest } from 'next/server'
import mongoose from 'mongoose'

import { assertENV } from './helpers/errorHandlers'
import { ApolloServer } from '@apollo/server'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import resolvers from './controller'
import typeDefs from './model'

if (assertENV(process.env.MONGODB_URI, true)) {
  mongoose.connect(process.env.MONGODB_URI)
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault()
  ],
  introspection: true,
})
const handler = startServerAndCreateNextHandler(server)

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
