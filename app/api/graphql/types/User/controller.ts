import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { generateAccessToken } from '../../../lib'
import { MongooseModel as BookingModel } from '../Booking'

import { MongooseModel } from './index'
import { IAddUserInput, IMongoose, IUpdateUserInput } from './interface'

const MAX_DEVICES = 2

const QueryResolvers = {
  async user(
    _: null,
    args: { id?: string },
    { userId }: { userId: string }
  ): Promise<IMongoose | null> {
    if (args.id) {
      return MongooseModel.findOne({ _id: args.id })
    }
    if (userId) {
      return MongooseModel.findOne({ _id: userId })
    }
    return null
  },
  async users(): Promise<IMongoose[]> {
    return MongooseModel.find({})
  },
  async loginUser(
    _: any,
    { email, password }: { email: string; password: string }
  ): Promise<{ refresh: string; access: string } | null> {
    const user = await MongooseModel.findOne({ email })
    if (!user) return null
    const pwd = user.password
    if (await bcrypt.compare(password, pwd)) {
      const refreshToken = jwt.sign({ id: user._id.toString() }, process.env.REFRESH_KEY!)
      const tokens = user.refreshTokens
      if (tokens.length === MAX_DEVICES) {
        tokens.shift()
      }
      tokens.push(refreshToken)
      await MongooseModel.updateOne({ email }, { refreshTokens: tokens })
      return {
        refresh: refreshToken,
        access: generateAccessToken({ id: user._id.toString() }),
      }
    }
    return null
  },
  async getAccessToken(
    _: any,
    { refreshToken, secret }: { refreshToken: string; secret: string }
  ): Promise<{ refresh: string; access: string } | null> {
    if (secret !== process.env.BACKEND_SECRET!) return null
    let payload: { id: string }
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_KEY!) as any
    } catch (e) {
      return null
    }
    const old = await MongooseModel.findOne({ _id: payload.id })

    if (!old) return null
    const tokens = old.refreshTokens
    const tokensIndex = tokens.indexOf(refreshToken)
    if (tokensIndex > -1) {
      tokens[tokensIndex] = jwt.sign({ id: payload.id }, process.env.REFRESH_KEY!)
      await MongooseModel.updateOne({ _id: payload.id }, { refreshTokens: tokens })
      return {
        access: generateAccessToken({ id: payload.id }),
        refresh: tokens[tokensIndex],
      }
    }
    return null
  },
}

const MutationResolvers = {
  async addUser(
    _: any,
    { user }: IAddUserInput
  ): Promise<{ refresh: string; access: string } | null> {
    const old = await MongooseModel.findOne({ email: user.email })
    if (old) return null
    const encrypted = await bcrypt.hash(user.password, 10)
    const newUser = await MongooseModel.create({ ...user, password: encrypted })
    const refreshToken = jwt.sign({ id: newUser._id.toString() }, process.env.REFRESH_KEY!)
    await MongooseModel.updateOne(
      { _id: newUser._id },
      { $push: { refreshTokens: [refreshToken] } }
    )
    return {
      refresh: refreshToken,
      access: generateAccessToken({ id: newUser._id.toString() }),
    }
  },

  async updateUser(_: any, { user }: IUpdateUserInput): Promise<IMongoose | null> {
    const newUser = await MongooseModel.findOneAndUpdate({ email: user.email }, user, { new: true })
    return newUser
  },
  async updateUserPassword(
    _: any,
    {
      email,
      new_password,
      old_password,
    }: { email: string; new_password: string; old_password: string }
  ): Promise<boolean> {
    const user = await MongooseModel.findOne({ email })
    if (!user) return false
    const pwd = user.password
    if (await bcrypt.compare(old_password, pwd)) {
      const encrypted = await bcrypt.hash(new_password, 10)
      await MongooseModel.updateOne({ email }, { password: encrypted })
      return true
    }
    return false
  },
}

const TypeResolvers = {
  async bookings(parent: any) {
    return BookingModel.find({ email: parent.email })
  },
}

const GQLResolvers = {
  query: QueryResolvers,
  mutation: MutationResolvers,
  type: TypeResolvers,
}

export default GQLResolvers
