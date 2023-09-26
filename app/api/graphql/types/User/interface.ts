import { Types } from 'mongoose'

export interface IAddUserInput {
  user: {
    name: string
    email: string
    password: string
  }
}

export interface IUpdateUserInput {
  user: {
    name?: string
    email?: string
  }
}

export interface IMongoose {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  refreshTokens: string[]
}
