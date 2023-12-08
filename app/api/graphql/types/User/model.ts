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
  updateUserPassword(email:String!, old_password:String!, new_password:String!): Boolean
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
    name:NameInput!
    password:String!
    email:String!
  }
  "Arguments to update user"
  input UpdateUserInput{
    email:String
    name:NameInput
      dob:String
      phone:PhoneInput
      nationality:String
  }
  "User type"
  type User {
    _id:ID!
    name:Name!
    email:String!
    dob:String
    phone:Phone
    nationality:String
    refreshTokens:[String!]
    bookings:[Booking!]
  }
`

export const MongooseSchema = new Schema<IMongoose>(
  {
    name: {
      designation: {
        type: String,
      },
      firstName: {
        type: String,
        required: true,
      },
      middleName: String,
      lastName: String,
    },
    email: {
      type: String,
      unique: true,
      index: true,
    },
    dob: {
      type: Schema.Types.Date,
    },
    phone: {
      code: String,
      number: String,
    },
    nationality: {
      type: String,
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
