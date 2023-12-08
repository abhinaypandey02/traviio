import { Types } from 'mongoose'

import { Name } from '../Booking/interface'

export interface IAddUserInput {
  user: {
    name: Name
    email: string
    password: string
  }
}

export interface IUpdateUserInput {
  user: {
    name?: Name
    email?: string

    dob: String
    nationality: String
    phone: { code: string; number: string }
  }
}

export interface IMongoose {
  _id: Types.ObjectId
  name: Name
  email: string
  password: string
  refreshTokens: string[]
  dob: String
  nationality: String
  phone: { code: string; number: string }
}
