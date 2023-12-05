import { Schema } from 'mongoose'

import { IMongoose } from './interface'

const GraphqlQuery = `
  "[Auth required] Get booking by id"
  booking(id:String!):Booking
`
const GraphqlMutation = `
  "[Auth required] Add new booking"
  addBooking(booking:AddBookingInput!): String
  updateBooking(booking:UpdateBookingInput!): String
  "[Webhook only] Complete booking"
  completeBooking(booking:String!, token:String!, paid:Int!): Boolean
  completeExtrasBooking(booking:String!, token:String!): Boolean
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
      town:String
      state:String!
      country:String!
  }
  "Address broken down"
  input AddressInput{
      line1:String!
      town:String
      state:String!
      country:String!
  }
  type Phone{
      code:String!
      number:String!
  }
  input PhoneInput{
      code:String!
      number:String!
  }
  "Adult details in a booking"
  type Adult{
      name:Name!
      dob:String!
      nationality:String
      email:String!
      phone:Phone
      address:Address
      passportNumber: String
      passportExpiry: String
      additionalInformation: String
      additionalTravellers: [String]
      passportCopy: String
      travelInsuranceCopy: String
  }
  "Adult details in a booking"
  input AdultInput{
      name:NameInput!
      dob:String!
      nationality:String
      email:String!
      phone:PhoneInput
      address:AddressInput

      passportNumber: String
      passportExpiry: String
      additionalInformation: String
      additionalTravellers: [String]
      passportCopy: String
      travelInsuranceCopy: String
  }
  "Arguments to add booking"
  input AddBookingInput{
      adults:[AdultInput!]!
      children:Int!
      tour:ID!
      from:String!
      to:String!
      price:Float!
      guests:Int!
      hotelType:String!
      roomType:String!
      optionalTours:[OptionalTourInput!]
      email:ID!
  }
  "Arguments to update booking"
  input UpdateBookingInput{
      id:ID!
      adults:[AdultInput!]
      children:Int
      guests:Int
      hotelType:String
      roomType:String
      stagedOptionalTours:[OptionalTourInput!]
      requests:[String!]
  }
  input OptionalTourInput{
      cityID:String!
      cityName:String!
      visitID:String!
      visitName:String!
      price:Int!
  }
  type OptionalTour{
      cityID:String!
      cityName:String!
      visitID:String!
      visitName:String!
      price:Int!
  }
  "Tour Booking"
  type Booking {
    _id:ID!
    tour:ID!
    children:Int!
    adults:[Adult!]!
    from:String!
    to:String!
    price:Float!
    paid:Float!
    guests:Int!
    hotelType:String!
    roomType:String!
    optionalTours:[OptionalTour!]
    stagedOptionalTours:[OptionalTour!]
    status:Status!
    user:User
    email:String!  
    requests:[String!]
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
        cityID: String,
        visitID: String,
        cityName: String,
        visitName: String,
        price: Number,
      },
    ],
    stagedOptionalTours: [
      {
        cityID: String,
        visitID: String,
        cityName: String,
        visitName: String,
        price: Number,
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
    requests: {
      type: [String],
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
                required: false,
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
          phone: {
            code: String,
            number: String,
          },
          passportNumber: String,
          passportExpiry: Schema.Types.Date,
          additionalInformation: String,
          additionalTravellers: [String],
          passportCopy: String,
          travelInsuranceCopy: String,
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
