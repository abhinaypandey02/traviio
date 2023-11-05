import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import { gql } from '../../__generated__'
import { GetUserQuery } from '../../__generated__/graphql'
import { getReactClient } from '../../apollo-client-ssr'

export async function getAccessToken() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/login')
  if (res.ok) return res.text()
  return null
}
const UserContext = createContext<{
  token?: string | null
  user?: GetUserQuery['user'] | null
  refetch: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}>({ refetch: async () => {}, login: async () => false, logout: async () => {} })

export async function getUser(token: string) {
  const client = getReactClient(token)
  const res = await client.query({
    query: gql(`
      #graphql
      query GetUser{
        user{
          name
        }
      }
    `),
  })

  return res?.data?.user
}
export function useUser() {
  return useContext(UserContext)
}
export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<GetUserQuery['user'] | null>()
  const [token, setToken] = useState<string | null>()
  async function logout() {
    setUser(null)
    setToken(null)
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/login', {
      method: 'DELETE',
    })
  }
  async function login(email: string, password: string) {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      const token = await res.text()
      await refetch(token)
      return true
    }
    return false
  }
  async function refetch(t?: string) {
    const token = t || (await getAccessToken())
    if (token) {
      setToken(token)
      const user = await getUser(token)
      setUser(user)
    } else {
      setUser(null)
      setToken(null)
    }
  }
  useEffect(() => {
    refetch()
  }, [])
  return (
    <UserContext.Provider value={{ token, user, refetch, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}
