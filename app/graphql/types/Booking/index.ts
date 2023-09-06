import { Model, model, models } from 'mongoose'

import GQLResolvers from './controller'
import { IMongoose } from './interface'
import GQLSchema, { MongooseSchema } from './model'

const name = 'Booking'
export const MongooseModel: Model<IMongoose> = models[name] || model(name, MongooseSchema)

const Booking = {
  name,
  GQLSchema,
  GQLResolvers,
}

export default Booking
