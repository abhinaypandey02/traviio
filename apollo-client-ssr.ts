import { InMemoryCache } from '@apollo/client'
import { ApolloClient } from '@apollo/client'

export function getReactClient(id?: string | null) {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    headers: {
      authorization: `Bearer ${id || null}`,
    },
  })
}
