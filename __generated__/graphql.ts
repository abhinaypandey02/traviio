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

/** Arguments to add booking */
export type AddBookingInput = {
  adults: Array<InputMaybe<AdultInput>>;
  children: Scalars['Int']['input'];
  email: Scalars['ID']['input'];
  from: Scalars['String']['input'];
  guests: Scalars['Int']['input'];
  hotelType: Scalars['String']['input'];
  optionalTours?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  roomType: Scalars['String']['input'];
  to: Scalars['String']['input'];
  tour: Scalars['ID']['input'];
};

/** Arguments to add user */
export type AddUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Address broken down */
export type Address = {
  __typename?: 'Address';
  country?: Maybe<Scalars['String']['output']>;
  line1: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  town: Scalars['String']['output'];
};

/** Address broken down */
export type AddressInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  line1: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  town: Scalars['String']['input'];
};

/** Adult details in a booking */
export type Adult = {
  __typename?: 'Adult';
  address?: Maybe<Address>;
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Name;
  nationality?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

/** Adult details in a booking */
export type AdultInput = {
  address?: InputMaybe<AddressInput>;
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: NameInput;
  nationality?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Tour Booking */
export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  adults: Array<Maybe<Adult>>;
  children: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  from: Scalars['String']['output'];
  guests: Scalars['Int']['output'];
  hotelType: Scalars['String']['output'];
  optionalTours?: Maybe<Array<Scalars['String']['output']>>;
  price: Scalars['Float']['output'];
  roomType: Scalars['String']['output'];
  status: Status;
  to: Scalars['String']['output'];
  tour: Scalars['ID']['output'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** [Auth required] Add new booking */
  addBooking?: Maybe<Scalars['String']['output']>;
  /** [Public] Get access token and refresh token after adding a new */
  addUser?: Maybe<Tokens>;
  /** [Webhook only] Complete booking */
  completeBooking?: Maybe<Scalars['Boolean']['output']>;
  /** [Authenticated] Update user details */
  updateUser?: Maybe<User>;
};


export type MutationAddBookingArgs = {
  booking: AddBookingInput;
};


export type MutationAddUserArgs = {
  user: AddUserInput;
};


export type MutationCompleteBookingArgs = {
  booking: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

/** Name broken down */
export type Name = {
  __typename?: 'Name';
  designation: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
};

/** Name broken down */
export type NameInput = {
  designation: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  /** [Auth required] Get booking by id */
  booking?: Maybe<Booking>;
  /** [Backend] Get access token from refresh token and update the refresh token in the backend */
  getAccessToken?: Maybe<Tokens>;
  /** [Public] Get access token and refresh token */
  loginUser?: Maybe<Tokens>;
  /** [Authenticated] Get a user by email */
  user?: Maybe<User>;
  /** [Admin] Get all users */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryBookingArgs = {
  id: Scalars['String']['input'];
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
  id?: InputMaybe<Scalars['String']['input']>;
};

/** Payment status */
export enum Status {
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

/** Token received on authentication */
export type Tokens = {
  __typename?: 'Tokens';
  access: Scalars['String']['output'];
  refresh: Scalars['String']['output'];
};

/** Arguments to update user */
export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** User type */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  bookings?: Maybe<Array<Booking>>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  refreshTokens?: Maybe<Array<Scalars['String']['output']>>;
};

export type AddBookingMutationVariables = Exact<{
  booking: AddBookingInput;
}>;


export type AddBookingMutation = { __typename?: 'Mutation', addBooking?: string | null };

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

export type GetBookingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBookingQuery = { __typename?: 'Query', booking?: { __typename?: 'Booking', email: string } | null };

export type UpdateBookingPaymentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  key: Scalars['String']['input'];
}>;


export type UpdateBookingPaymentMutation = { __typename?: 'Mutation', completeBooking?: boolean | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', name: string } | null };


export const AddBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"booking"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"booking"}}}]}]}}]} as unknown as DocumentNode<AddBookingMutation, AddBookingMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]} as unknown as DocumentNode<LoginUserQuery, LoginUserQueryVariables>;
export const GetAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secret"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"secret"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secret"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}},{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]} as unknown as DocumentNode<GetAccessTokenQuery, GetAccessTokenQueryVariables>;
export const GetBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetBookingQuery, GetBookingQueryVariables>;
export const UpdateBookingPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookingPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<UpdateBookingPaymentMutation, UpdateBookingPaymentMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;