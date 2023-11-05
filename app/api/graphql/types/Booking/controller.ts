import { ObjectId } from 'mongodb'

import User, { MongooseModel as UserModel } from '../User'

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
  async completeBooking(
    _: any,
    { booking, token }: { booking: string; token: string }
  ): Promise<true | null> {
    if (token !== process.env.BACKEND_SECRET) return null
    await MongooseModel.updateOne({ _id: booking }, { status: 'PAID' })
    return true
  },
}

const TypeResolvers = {
  async user(parent: IMongoose) {
    return UserModel.findOne({ email: parent.email })
  },
}

const GQLResolvers = {
  query: QueryResolvers,
  mutation: MutationResolvers,
  type: TypeResolvers,
}

export default GQLResolvers
