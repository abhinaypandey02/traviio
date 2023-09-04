import { Schema } from 'mongoose'

import { IMongoose } from './interface'

const GraphqlQuery = `
  booking(id:String!, key:String):Booking
`
const GraphqlMutation = `
  addBooking(booking:AddBookingInput!): String
`
const GraphqlType = `
  #graphql
  input AddBookingInput{
      tour:ID!
      from:String!
      to:String!
      price:Float!
      guests:Int!
  }
  type Booking {
    _id:ID!
    tour:ID!
    from:String!
    to:String!
    price:Float!
    guests:Int!
  }
`

export const MongooseSchema = new Schema<IMongoose>(
  {
    from: {
      type: Schema.Types.Date,
      required: true,
    },
    to: {
      type: Schema.Types.Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
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
