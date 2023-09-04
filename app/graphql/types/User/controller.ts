
import { MongooseModel } from './index'
import { IAddUserInput, IMongoose, IUpdateUserInput } from './interface'

const ADMIN = process.env.SITE_ADMINS!?.split(', ')

const QueryResolvers = {
  async user(_: null, args: { email: string }): Promise<IMongoose | null> {
      return MongooseModel.findOne({ email: args.email })
  },
  async userById(_: null, args: { id?: string }): Promise<IMongoose | null> {
    if (args.id) {
      return MongooseModel.findOne({ _id: args.id })
    }
    return null
  },
  async users(): Promise<IMongoose[]> {
    return MongooseModel.find({})
  },
}

const MutationResolvers = {
  async addUser(_: any, { user }: IAddUserInput): Promise<IMongoose | null> {
    const newUser = await MongooseModel.create(user)
    return await newUser.save()
  },

  async updateUser(
    _: any,
    { user }: IUpdateUserInput,
  ): Promise<IMongoose | null> {
    const newUser = await MongooseModel.findOneAndUpdate(
      { email: user.email },
      user,
      { new: true }
    )
    return newUser
  },
}

const TypeResolvers = {
}

const GQLResolvers = {
  query: QueryResolvers,
  mutation: MutationResolvers,
  type: TypeResolvers,
}

export default GQLResolvers
