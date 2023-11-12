import { Types } from 'mongoose'

export interface AddBookingInput {
  booking: {
    guests: number
    from: typeof Date
    to: typeof Date
    price: number
    tour: string
    children: number
    adults: IAdult[]
    hotelType: string
    roomType: string
    optionalTours: string[]
    email: string
  }
}
interface IAdult {
  name: {
    designation: string
    firstName: string
    middleName?: string
    lastName?: string
  }
  address?: {
    line1: string
    state: string
    town: string
    country: string
  }
  dob: typeof Date
  nationality?: string
  email: string
  phone?: string
}
export interface IMongoose {
  _id: Types.ObjectId
  guests: number
  from: typeof Date
  to: typeof Date
  price: number
  paid: number
  tour: string
  children: number
  adults: IAdult[]
  hotelType: string
  roomType: string
  optionalTours: string[]
  status: string
  email: string
}
