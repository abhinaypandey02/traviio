import { InMemoryCache } from '@apollo/client/cache'
import { ApolloClient } from '@apollo/client/core/ApolloClient'

export function getReactClient(id?: string) {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${id || null}`,
    },
  })
}
