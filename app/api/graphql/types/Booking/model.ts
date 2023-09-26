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
  enum Status{
      PAID
      UNPAID
  }
  type Name{
      designation:String!
      firstName:String!
      middleName:String
      lastName:String
  }
  
  input NameInput{
      designation:String!
      firstName:String!
      middleName:String
      lastName:String
  }
  type Address{
      line1:String!
      town:String!
      state:String
      country:String
  }
  input AddressInput{
      line1:String!
      town:String!
      state:String
      country:String
  }
  type Adult{
      name:Name!
      dob:String!
      nationality:String
      email:String!
      phone:String
      address:Address
  }
  input AdultInput{
      name:NameInput!
      dob:String!
      nationality:String
      email:String!
      phone:String
      address:AddressInput
  }
  input AddBookingInput{
      adults:[AdultInput]!
      children:Int!
      tour:ID!
      from:String!
      to:String!
      price:Float!
      guests:Int!
      hotelType:String!
      roomType:String!
      optionalTours:[String!]
  }
  type Booking {
    _id:ID!
    tour:ID!
    children:Int!
    adults:[Adult]!
    from:String!
    to:String!
    price:Float!
    guests:Int!
    hotelType:String!
    roomType:String!
    optionalTours:[String!]
    status:Status!
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
      type: String,
      required: true,
    },
    hotelType: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    optionalTours: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    adults: [
      {
        type: {
          name: {
            designation: {
              type: String,
              required: true,
            },
            firstName: {
              type: String,
              required: true,
            },
            middleName: String,
            lastName: String,
          },
          address: {
            line1: {
              type: String,
              required: true,
            },
            town: {
              type: String,
              required: true,
            },
            state: {
              type: String,
              required: true,
            },
            country: {
              type: String,
              required: true,
            },
          },
          dob: {
            type: Schema.Types.Date,
            required: true,
          },
          nationality: String,
          email: {
            type: String,
            required: true,
          },
          phone: String,
        },
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
