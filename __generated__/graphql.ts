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
  adults: Array<AdultInput>;
  children: Scalars['Int']['input'];
  email: Scalars['ID']['input'];
  from: Scalars['String']['input'];
  guests: Scalars['Int']['input'];
  hotelType: Scalars['String']['input'];
  optionalTours?: InputMaybe<Array<OptionalTourInput>>;
  price: Scalars['Float']['input'];
  roomType: Scalars['String']['input'];
  to: Scalars['String']['input'];
  tour: Scalars['ID']['input'];
};

/** Arguments to add user */
export type AddUserInput = {
  email: Scalars['String']['input'];
  name: NameInput;
  password: Scalars['String']['input'];
};

/** Address broken down */
export type Address = {
  __typename?: 'Address';
  country: Scalars['String']['output'];
  line1: Scalars['String']['output'];
  state: Scalars['String']['output'];
  town?: Maybe<Scalars['String']['output']>;
};

/** Address broken down */
export type AddressInput = {
  country: Scalars['String']['input'];
  line1: Scalars['String']['input'];
  state: Scalars['String']['input'];
  town?: InputMaybe<Scalars['String']['input']>;
};

/** Adult details in a booking */
export type Adult = {
  __typename?: 'Adult';
  additionalInformation?: Maybe<Scalars['String']['output']>;
  additionalTravellers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  address?: Maybe<Address>;
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Name;
  nationality?: Maybe<Scalars['String']['output']>;
  passportCopy?: Maybe<Scalars['String']['output']>;
  passportExpiry?: Maybe<Scalars['String']['output']>;
  passportNumber?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Phone>;
  travelInsuranceCopy?: Maybe<Scalars['String']['output']>;
};

/** Adult details in a booking */
export type AdultInput = {
  additionalInformation?: InputMaybe<Scalars['String']['input']>;
  additionalTravellers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  address?: InputMaybe<AddressInput>;
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: NameInput;
  nationality?: InputMaybe<Scalars['String']['input']>;
  passportCopy?: InputMaybe<Scalars['String']['input']>;
  passportExpiry?: InputMaybe<Scalars['String']['input']>;
  passportNumber?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
  travelInsuranceCopy?: InputMaybe<Scalars['String']['input']>;
};

/** Tour Booking */
export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  adults: Array<Adult>;
  children: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  from: Scalars['String']['output'];
  guests: Scalars['Int']['output'];
  hotelType: Scalars['String']['output'];
  optionalTours?: Maybe<Array<OptionalTour>>;
  paid: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  requests?: Maybe<Array<Scalars['String']['output']>>;
  roomType: Scalars['String']['output'];
  stagedOptionalTours?: Maybe<Array<OptionalTour>>;
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
  completeExtrasBooking?: Maybe<Scalars['Boolean']['output']>;
  updateBooking?: Maybe<Scalars['String']['output']>;
  /** [Authenticated] Update user details */
  updateUser?: Maybe<User>;
  updateUserPassword?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddBookingArgs = {
  booking: AddBookingInput;
};


export type MutationAddUserArgs = {
  user: AddUserInput;
};


export type MutationCompleteBookingArgs = {
  booking: Scalars['String']['input'];
  paid: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};


export type MutationCompleteExtrasBookingArgs = {
  booking: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationUpdateBookingArgs = {
  booking: UpdateBookingInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  email: Scalars['String']['input'];
  new_password: Scalars['String']['input'];
  old_password: Scalars['String']['input'];
};

/** Name broken down */
export type Name = {
  __typename?: 'Name';
  designation?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
};

/** Name broken down */
export type NameInput = {
  designation?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
};

export type OptionalTour = {
  __typename?: 'OptionalTour';
  cityID: Scalars['String']['output'];
  cityName: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  visitID: Scalars['String']['output'];
  visitName: Scalars['String']['output'];
};

export type OptionalTourInput = {
  cityID: Scalars['String']['input'];
  cityName: Scalars['String']['input'];
  price: Scalars['Int']['input'];
  visitID: Scalars['String']['input'];
  visitName: Scalars['String']['input'];
};

export type Phone = {
  __typename?: 'Phone';
  code?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

export type PhoneInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
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

/** Arguments to update booking */
export type UpdateBookingInput = {
  adults?: InputMaybe<Array<AdultInput>>;
  children?: InputMaybe<Scalars['Int']['input']>;
  guests?: InputMaybe<Scalars['Int']['input']>;
  hotelType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  requests?: InputMaybe<Array<Scalars['String']['input']>>;
  roomType?: InputMaybe<Scalars['String']['input']>;
  stagedOptionalTours?: InputMaybe<Array<OptionalTourInput>>;
};

/** Arguments to update user */
export type UpdateUserInput = {
  dob?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<NameInput>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<PhoneInput>;
};

/** User type */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  bookings?: Maybe<Array<Booking>>;
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name: Name;
  nationality?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Phone>;
  refreshTokens?: Maybe<Array<Scalars['String']['output']>>;
};

export type AddBookingMutationVariables = Exact<{
  booking: AddBookingInput;
}>;


export type AddBookingMutation = { __typename?: 'Mutation', addBooking?: string | null };

export type SingleBookingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type SingleBookingQuery = { __typename?: 'Query', booking?: { __typename?: 'Booking', email: string, tour: string, optionalTours?: Array<{ __typename?: 'OptionalTour', price: number }> | null } | null };

export type StagedExtrasBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  stagedOptionalTours?: InputMaybe<Array<OptionalTourInput> | OptionalTourInput>;
}>;


export type StagedExtrasBookingMutation = { __typename?: 'Mutation', updateBooking?: string | null };

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

export type UpdateBookingExtrasMutationVariables = Exact<{
  id: Scalars['String']['input'];
  key: Scalars['String']['input'];
}>;


export type UpdateBookingExtrasMutation = { __typename?: 'Mutation', completeExtrasBooking?: boolean | null };

export type GetBookingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBookingQuery = { __typename?: 'Query', booking?: { __typename?: 'Booking', email: string } | null };

export type UpdateBookingPaymentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  key: Scalars['String']['input'];
  paid: Scalars['Int']['input'];
}>;


export type UpdateBookingPaymentMutation = { __typename?: 'Mutation', completeBooking?: boolean | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', dob?: string | null, email: string, nationality?: string | null, name: { __typename?: 'Name', firstName: string, designation?: string | null, middleName?: string | null, lastName?: string | null }, phone?: { __typename?: 'Phone', number?: string | null, code?: string | null } | null } | null };

export type UpdateRequestsMutationVariables = Exact<{
  requests?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  id: Scalars['ID']['input'];
}>;


export type UpdateRequestsMutation = { __typename?: 'Mutation', updateBooking?: string | null };

export type UpdateBookingMutationVariables = Exact<{
  booking: UpdateBookingInput;
}>;


export type UpdateBookingMutation = { __typename?: 'Mutation', updateBooking?: string | null };

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', name: { __typename?: 'Name', firstName: string } } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  old_password: Scalars['String']['input'];
  new_password: Scalars['String']['input'];
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword?: boolean | null };

export type BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsQuery = { __typename?: 'Query', user?: { __typename?: 'User', bookings?: Array<{ __typename?: 'Booking', tour: string, email: string, requests?: Array<string> | null, from: string, paid: number, price: number, to: string, _id: string, optionalTours?: Array<{ __typename?: 'OptionalTour', cityID: string, visitID: string }> | null, adults: Array<{ __typename?: 'Adult', email: string, dob: string, nationality?: string | null, passportExpiry?: string | null, passportNumber?: string | null, additionalInformation?: string | null, additionalTravellers?: Array<string | null> | null, name: { __typename?: 'Name', firstName: string, lastName?: string | null, designation?: string | null, middleName?: string | null }, address?: { __typename?: 'Address', country: string, line1: string, state: string, town?: string | null } | null, phone?: { __typename?: 'Phone', code?: string | null, number?: string | null } | null }> }> | null } | null };


export const AddBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"booking"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"booking"}}}]}]}}]} as unknown as DocumentNode<AddBookingMutation, AddBookingMutationVariables>;
export const SingleBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SingleBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"tour"}},{"kind":"Field","name":{"kind":"Name","value":"optionalTours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<SingleBookingQuery, SingleBookingQueryVariables>;
export const StagedExtrasBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StagedExtrasBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stagedOptionalTours"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OptionalTourInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stagedOptionalTours"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stagedOptionalTours"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}]}}]} as unknown as DocumentNode<StagedExtrasBookingMutation, StagedExtrasBookingMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"refresh"}}]}}]}}]} as unknown as DocumentNode<LoginUserQuery, LoginUserQueryVariables>;
export const GetAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"secret"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"secret"},"value":{"kind":"Variable","name":{"kind":"Name","value":"secret"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"}},{"kind":"Field","name":{"kind":"Name","value":"access"}}]}}]}}]} as unknown as DocumentNode<GetAccessTokenQuery, GetAccessTokenQueryVariables>;
export const UpdateBookingExtrasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookingExtras"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeExtrasBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<UpdateBookingExtrasMutation, UpdateBookingExtrasMutationVariables>;
export const GetBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"booking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetBookingQuery, GetBookingQueryVariables>;
export const UpdateBookingPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookingPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"paid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paid"}}}]}]}}]} as unknown as DocumentNode<UpdateBookingPaymentMutation, UpdateBookingPaymentMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const UpdateRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requests"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"requests"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requests"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}]}}]} as unknown as DocumentNode<UpdateRequestsMutation, UpdateRequestsMutationVariables>;
export const UpdateBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"booking"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBookingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"booking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"booking"}}}]}]}}]} as unknown as DocumentNode<UpdateBookingMutation, UpdateBookingMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"old_password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"old_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"old_password"}}},{"kind":"Argument","name":{"kind":"Name","value":"new_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}}}]}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const BookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tour"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"requests"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"paid"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"optionalTours"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cityID"}},{"kind":"Field","name":{"kind":"Name","value":"visitID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"adults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"town"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"phone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportExpiry"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"additionalInformation"}},{"kind":"Field","name":{"kind":"Name","value":"additionalTravellers"}}]}}]}}]}}]}}]} as unknown as DocumentNode<BookingsQuery, BookingsQueryVariables>;