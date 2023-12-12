import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { gql } from '../../../__generated__'
import { getClient } from '../../../apollo-client'

export const POST = async (req: Request) => {
  const user = await req.json()
  if (!user.email || !user.password) {
    return new NextResponse('', {
      status: 400,
    })
  }
  const client = await getClient()
  let token
  console.log(user)
  if (user.signup) {
    if (!user.name) {
      return new NextResponse('', {
        status: 400,
      })
    }
    const res = await client.mutate({
      mutation: gql(`
        #graphql
        mutation AddUser($user: AddUserInput!) {
          addUser(user:$user){
            access
            refresh
          }
        }
      `),
      variables: {
        user: { name: { firstName: user.name }, email: user.email, password: user.password },
      },
    })
    token = res.data?.addUser
    if (!token)
      return new NextResponse('User already exists', {
        status: 403,
      })
  } else {
    const res = await client.mutate({
      mutation: gql(`
        #graphql
        query LoginUser($email: String!, $password:String!){
          loginUser(email: $email, password:$password){
            access
            refresh
          }
        }
      `),
      variables: { email: user.email, password: user.password },
    })
    token = res.data?.loginUser
  }
  if (token) {
    const response = new NextResponse(token.access, {
      status: 200,
    })
    response.cookies.set('refresh', token.refresh, {
      secure: true,
      httpOnly: true,
    })
    return response
  }
  return new NextResponse('', {
    status: 403,
  })
}
export const GET = async (req: Request) => {
  const refresh = cookies().get('refresh')?.value
  if (!refresh)
    return new NextResponse('No refresh token', {
      status: 400,
    })
  const client = await getClient()

  const res = await client.query({
    query: gql(`
      #graphql
      query GetAccessToken($refreshToken: String!, $secret:String!){
        getAccessToken(refreshToken: $refreshToken, secret:$secret){
          refresh
          access
        }
      }

    `),
    variables: {
      refreshToken: refresh,
      secret: process.env.BACKEND_SECRET!,
    },
  })
  const token = res.data.getAccessToken
  if (token) {
    const response = new NextResponse(token.access, {
      status: 200,
    })
    response.cookies.set('refresh', token.refresh, {
      secure: true,
      httpOnly: true,
    })
    return response
  }
  const _res = new NextResponse('', {
    status: 403,
  })
  _res.cookies.set('refresh', '', { expires: 0 })
  return _res
}

export const DELETE = async () => {
  const _res = new NextResponse('', {
    status: 200,
  })
  _res.cookies.set('refresh', '', { expires: 0 })
  return _res
}
