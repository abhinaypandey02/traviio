import { Types } from 'mongoose'

export interface AddBookingInput {
  booking: {
    guests: number
    tour: string
    from: string
    to: string
    price: number
  }
}

export interface IMongoose {
  _id: Types.ObjectId
  guests: number
  from: typeof Date
  to: typeof Date
  tour: Types.ObjectId
  price: number
}
