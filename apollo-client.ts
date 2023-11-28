import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

export function getSSRClient(id?: string) {
  const httpLink = new HttpLink({
    // https://studio.apollographql.com/public/spacex-l4uc6p/
    uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
    headers: {
      authorization: `Bearer ${id || null}`,
    },
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      addTypename: false,
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

export const getClient = async (
  idToken?: string
): Promise<NextSSRApolloClient<any> | ApolloClient<any>> => {
  try {
    const _client = registerApolloClient(() => {
      return new ApolloClient({
        cache: new InMemoryCache({
          addTypename: false,
        }),
        link: new HttpLink({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
          headers: {
            authorization: `Bearer ${idToken || null}`,
          },
        }),
      })
    })
    return _client.getClient()
  } catch (e) {
    return getSSRClient(idToken)
  }
}
