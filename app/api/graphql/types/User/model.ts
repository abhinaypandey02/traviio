import { Schema } from 'mongoose'

import { IMongoose } from './interface'

const GraphqlQuery = `
  "[Authenticated] Get a user by email"
  user(id:String):User
  "[Admin] Get all users"
  users:[User]
  "[Backend] Get access token from refresh token and update the refresh token in the backend"
  getAccessToken(refreshToken:String!, secret:String!):Tokens
  "[Public] Get access token and refresh token"
  loginUser(email:String!, password:String!):Tokens
`
const GraphqlMutation = `
  "[Public] Get access token and refresh token after adding a new"
  addUser(user:AddUserInput!): Tokens
  "[Authenticated] Update user details"
  updateUser(user:UpdateUserInput!): User
`
const GraphqlType = `
  #graphql
  "Token received on authentication"
  type Tokens{
    refresh:String!
    access:String!
  }
  "Arguments to add user"
  input AddUserInput{
    name:String!
    password:String!
    email:String!
  }
  "Arguments to update user"
  input UpdateUserInput{
    email:String
    name:String
  }
  "User type"
  type User {
    _id:ID!
    name:String!
    email:String!
    refreshTokens:[String!]
    bookings:[Booking!]
  }
`

export const MongooseSchema = new Schema<IMongoose>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const GQLSchema = {
  query: GraphqlQuery,
  mutation: GraphqlMutation,
  type: GraphqlType,
}
export default GQLSchema
