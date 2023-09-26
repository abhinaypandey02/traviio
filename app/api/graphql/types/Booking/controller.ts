import { ObjectId } from 'mongodb'

import { MongooseModel } from './index'
import { AddBookingInput, IMongoose } from './interface'

const QueryResolvers = {
  async booking(_: null, args: { id: string }): Promise<IMongoose | null> {
    return MongooseModel.findOne({
      _id: args.id,
    })
  },
}

const MutationResolvers = {
  async addBooking(_: any, { booking }: AddBookingInput): Promise<ObjectId | null> {
    const newBooking = await MongooseModel.create({ ...booking, status: 'UNPAID' })
    const doc = await newBooking.save()
    return doc._id
  },
}

const TypeResolvers = {}

const GQLResolvers = {
  query: QueryResolvers,
  mutation: MutationResolvers,
  type: TypeResolvers,
}

export default GQLResolvers
