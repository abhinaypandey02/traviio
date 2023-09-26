import { Schema } from 'mongoose'

import { IMongoose } from './interface'

const GraphqlQuery = `
  user(email:String):User
  userById(id:String):User
  users:[User]
  getAccessToken(refreshToken:String!, secret:String!):Tokens
  loginUser(email:String!, password:String!):Tokens
`
const GraphqlMutation = `
  addUser(user:AddUserInput!): Tokens
  updateUser(user:UpdateUserInput!): User
  deleteUser: Boolean
  sendEmail(to:String!, dynamicTemplateData:String!): User
`
const GraphqlType = `
  #graphql
  type Tokens{
    refresh:String!
    access:String!
  }
  input AddUserInput{
    name:String!
    password:String!
    email:String!
  }
  input UpdateUserInput{
    email:String
    name:String
  }
  type User {
    _id:ID!
    name:String!
    email:String!
    refreshTokens:[String!]
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
