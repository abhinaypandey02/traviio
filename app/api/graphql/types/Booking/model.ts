import { Schema } from 'mongoose'

import { IMongoose } from './interface'

const GraphqlQuery = `
  "[Auth required] Get booking by id"
  booking(id:String!):Booking
`
const GraphqlMutation = `
  "[Auth required] Add new booking"
  addBooking(booking:AddBookingInput!): String
  "[Webhook only] Complete booking"
  completeBooking(booking:String!, token:String!, paid:Int!): Boolean
`
const GraphqlType = `
  #graphql
  "Payment status"
  enum Status{
      PAID
      UNPAID
  }
  "Name broken down"
  type Name{
      designation:String!
      firstName:String!
      middleName:String
      lastName:String
  }
  "Name broken down"
  input NameInput{
      designation:String!
      firstName:String!
      middleName:String
      lastName:String
  }
  "Address broken down"
  type Address{
      line1:String!
      town:String!
      state:String
      country:String
  }
  "Address broken down"
  input AddressInput{
      line1:String!
      town:String!
      state:String
      country:String
  }
  "Adult details in a booking"
  type Adult{
      name:Name!
      dob:String!
      nationality:String
      email:String!
      phone:String
      address:Address
  }
  "Adult details in a booking"
  input AdultInput{
      name:NameInput!
      dob:String!
      nationality:String
      email:String!
      phone:String
      address:AddressInput
  }
  "Arguments to add booking"
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
      email:ID!
  }
  "Tour Booking"
  type Booking {
    _id:ID!
    tour:ID!
    children:Int!
    adults:[Adult]!
    from:String!
    to:String!
    price:Float!
    paid:Float!
    guests:Int!
    hotelType:String!
    roomType:String!
    optionalTours:[String!]
    status:Status!
    user:User
    email:String!  
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
    paid: {
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
    email: {
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
            type: {
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
            required: false,
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
