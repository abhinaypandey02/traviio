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
    optionalTours: OptionalTour[]
    email: string
  }
}
export interface UpdateBookingInput {
  booking: {
    id: string
    guests?: number
    children?: number
    adults?: IAdult[]
    hotelType?: string
    roomType?: string
    stagedOptionalTours?: OptionalTour[]
    optionalTours?: OptionalTour[]
    requests?: string[]
  }
}
export interface Name {
  designation: string
  firstName: string
  middleName?: string
  lastName?: string
}
interface IAdult {
  name: Name
  address?: {
    line1: string
    state: string
    town: string
    country: string
  }
  dob: typeof Date
  nationality?: string
  email: string
  phone?: {
    code: string
    number: string
  }
  passportNumber?: string
  passportExpiry?: typeof Date
  additionalInformation?: string
  additionalTravellers?: string[]
  passportCopy?: string
  travelInsuranceCopy?: string
}
interface OptionalTour {
  cityID: string
  visitID: string
  visitName: string
  cityName: string
  price: number
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
  optionalTours: OptionalTour[]
  stagedOptionalTours: OptionalTour[]
  status: string
  email: string
  requests: string[]
}
