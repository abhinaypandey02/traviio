import { Schema } from 'mongoose'

import { IMongoose } from './interface'

const GraphqlQuery = `
  user(email:String):User
  userById(id:String):User
  users:[User]
`
const GraphqlMutation = `
  addUser(user:AddUserInput!): User
  updateUser(user:UpdateUserInput!): User
  deleteUser: Boolean
  sendEmail(to:String!, dynamicTemplateData:String!): User
`
const GraphqlType = `
  #graphql
  input AddUserInput{
      firstName:String
      lastName:String
    email:String!
    picture: String
  }
  input UpdateUserInput{
    email:String
    firstName:String
    lastName:String
    phone:String
    
    picture:String
    
  }
  type User {
    _id:ID!
    
    firstName:String
    lastName:String
    email:String!
    phone:String
    picture:String
    
  }
`

export const MongooseSchema = new Schema<IMongoose>(
  {

    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
      required: false,
    },
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
