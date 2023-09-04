import { Types } from 'mongoose'

export interface IAddUserInput {
  user: {
    name: string
    email: string
    picture?: string
  }
}

export interface IUpdateUserInput {
  user: {
    firstName?: string
    lastName?: string
    email: string
    phone?: string
    picture?: string
  }
}

export interface IMongoose {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  phone?: string
  picture?: string
}
