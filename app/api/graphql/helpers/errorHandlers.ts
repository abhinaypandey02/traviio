import { GraphQLError } from 'graphql/index'

export function assertENV(name: string | undefined, nativeError?: boolean): name is string {
  if (!name) {
    const ErrorMessage = 'missing env ' + name
    if (nativeError) {
      throw new Error(ErrorMessage)
    }
    throw new GraphQLError(ErrorMessage, {
      extensions: {
        code: 'MISSING_ENV',
        http: { status: 500 },
      },
    })
  }
  return true
}

export function assertAuthenticated(userId: unknown): userId is string {
  if (!userId || typeof userId !== 'string') {
    throw new GraphQLError('User is not authenticated. Please login first!', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }
  return true
}
