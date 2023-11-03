import { ApolloClient, InMemoryCache } from '@apollo/client'

export function getReactClient(id?: string) {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${id || null}`,
    },
  })
}
