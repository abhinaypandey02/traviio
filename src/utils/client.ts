import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

export function makeClientWithAuth(id?: string) {
  return function makeClient() {
    const httpLink = new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
      headers: {
        authorization: `Bearer ${id || null}`,
      },
    })

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
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
}

export const getClient = async (
  idToken?: string
): Promise<NextSSRApolloClient<any> | ApolloClient<any>> => {
  let getClient
  try {
    const _client = registerApolloClient(() => {
      return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_BASE_URL,
          headers: {
            authorization: `Bearer ${idToken || null}`,
          },
        }),
      })
    })
    getClient = _client.getClient
  } catch (e) {
    getClient = makeClientWithAuth(idToken)
  }
  return getClient()
}
