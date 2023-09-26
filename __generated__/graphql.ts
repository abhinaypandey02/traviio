/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddBookingInput = {
  adults: Array<InputMaybe<AdultInput>>;
  children: Scalars['Int']['input'];
  from: Scalars['String']['input'];
  guests: Scalars['Int']['input'];
  hotelType: Scalars['String']['input'];
  optionalTours?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  roomType: Scalars['String']['input'];
  to: Scalars['String']['input'];
  tour: Scalars['ID']['input'];
};

export type AddUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Address = {
  __typename?: 'Address';
  country?: Maybe<Scalars['String']['output']>;
  line1: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  town: Scalars['String']['output'];
};

export type AddressInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  line1: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  town: Scalars['String']['input'];
};

export type Adult = {
  __typename?: 'Adult';
  address?: Maybe<Address>;
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Name;
  nationality?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type AdultInput = {
  address?: InputMaybe<AddressInput>;
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: NameInput;
  nationality?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  adults: Array<Maybe<Adult>>;
  children: Scalars['Int']['output'];
  from: Scalars['String']['output'];
  guests: Scalars['Int']['output'];
  hotelType: Scalars['String']['output'];
  optionalTours?: Maybe<Array<Scalars['String']['output']>>;
  price: Scalars['Float']['output'];
  roomType: Scalars['String']['output'];
  status: Status;
  to: Scalars['String']['output'];
  tour: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBooking?: Maybe<Scalars['String']['output']>;
  addUser?: Maybe<Tokens>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  sendEmail?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationAddBookingArgs = {
  booking: AddBookingInput;
};


export type MutationAddUserArgs = {
  user: AddUserInput;
};


export type MutationSendEmailArgs = {
  dynamicTemplateData: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

export type Name = {
  __typename?: 'Name';
  designation: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
};

export type NameInput = {
  designation: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  booking?: Maybe<Booking>;
  getAccessToken?: Maybe<Tokens>;
  loginUser?: Maybe<Tokens>;
  user?: Maybe<User>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryBookingArgs = {
  id: Scalars['String']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAccessTokenArgs = {
  refreshToken: Scalars['String']['input'];
  secret: Scalars['String']['input'];
};


export type QueryLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserByIdArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export enum Status {
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Tokens = {
  __typename?: 'Tokens';
  access: Scalars['String']['output'];
  refresh: Scalars['String']['output'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  refreshTokens?: Maybe<Array<Scalars['String']['output']>>;
};

export type AddUserMutationVariables = Exact<{
  user: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: { __typename?: 'Tokens', access: string, refresh: string } | null };

export type LoginUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser?: { __typename?: 'Tokens', access: string, refresh: string } | null };

export type GetAccessTokenQueryVariables = Exact<{
  refreshToken: Scalars['String']['input'];
  secret: Scalars['String']['input'];
}>;


export type GetAccessTokenQuery = { __typename?: 'Query', getAccessToken?: { __typename?: 'Tokens', refresh: string, access: string } | null };


export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]} as unknown as DocumentNode<LoginUserQuery, LoginUserQueryVariables>;
export const GetAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secret"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"secret"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secret"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}},{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]} as unknown as DocumentNode<GetAccessTokenQuery, GetAccessTokenQueryVariables>;