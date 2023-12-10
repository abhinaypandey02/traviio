/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n            #graphql\n            mutation AddBooking($booking:AddBookingInput!){\n                addBooking(booking:$booking)\n            }\n        ": types.AddBookingDocument,
    "\n      #graphql\n      query SingleBooking($id:String!){\n        booking(id: $id){\n          email\n          tour\n          optionalTours {\n            price\n          }\n        }\n      }\n    ": types.SingleBookingDocument,
    "\n      #graphql\n      mutation StagedExtrasBooking($id:ID!,$stagedOptionalTours:[OptionalTourInput!]){\n        updateBooking(booking: {stagedOptionalTours:$stagedOptionalTours, id:$id})\n      }\n    ": types.StagedExtrasBookingDocument,
    "\n        #graphql\n        mutation AddUser($user: AddUserInput!) {\n          addUser(user:$user){\n            access\n            refresh\n          }\n        }\n      ": types.AddUserDocument,
    "\n        #graphql\n        query LoginUser($email: String!, $password:String!){\n          loginUser(email: $email, password:$password){\n            access\n            refresh\n          }\n        }\n      ": types.LoginUserDocument,
    "\n      #graphql\n      query GetAccessToken($refreshToken: String!, $secret:String!){\n        getAccessToken(refreshToken: $refreshToken, secret:$secret){\n          refresh\n          access\n        }\n      }\n\n    ": types.GetAccessTokenDocument,
    "\n            #graphql\n            mutation UpdateBookingExtras($id:String!,$key:String!){\n              completeExtrasBooking(booking: $id, token:$key)\n            }\n          ": types.UpdateBookingExtrasDocument,
    "\n            #graphql\n            query GetBooking($id:String!){\n              booking(id: $id){\n                email\n              }\n            }\n          ": types.GetBookingDocument,
    "\n            #graphql\n            mutation UpdateBookingPayment($id:String!, $key:String!, $paid:Int!){\n              completeBooking(booking: $id, token:$key, paid:$paid)\n            }": types.UpdateBookingPaymentDocument,
    "\n      #graphql\n      query GetUser{\n        user{\n          name{\n            firstName\n            designation\n            middleName\n            lastName\n          }\n          dob\n          email\n          phone {\n            number\n            code\n          }\n          nationality\n        }\n      }\n    ": types.GetUserDocument,
    "\n              #graphql\n              mutation UpdateRequests($requests:[String!], $id:ID!){\n                updateBooking(booking: {requests: $requests, id: $id})\n              }\n            ": types.UpdateRequestsDocument,
    "\n        #graphql\n        mutation UpdateBooking($booking: UpdateBookingInput!){\n          updateBooking(booking: $booking)\n        }\n      ": types.UpdateBookingDocument,
    "\n      #graphql\n      mutation UpdateFlightInfo($booking:UpdateBookingInput!){\n        updateBooking(booking: $booking)\n      }\n    ": types.UpdateFlightInfoDocument,
    "\n        #graphql\n        mutation UpdateUser($user: UpdateUserInput!){\n          updateUser(user: $user){\n            name {\n                firstName\n            }\n          }\n        }\n      ": types.UpdateUserDocument,
    "\n        #graphql\n        mutation UpdateUserPassword($email:String!, $old_password: String!, $new_password: String!){\n          updateUserPassword(email: $email, old_password: $old_password, new_password: $new_password)\n        }\n      ": types.UpdateUserPasswordDocument,
    "\n          #graphql\n          query Bookings{\n            user{\n              bookings {\n                tour\n                email\n                requests\n                from\n                paid\n                flights{\n                  airCompany\n                  arrivalAirport\n                  arrivalTime\n                  departureTime\n                  flightNumber\n                }\n                price\n                to\n                optionalTours {\n                  cityID\n                  visitID\n                }\n                _id\n                adults {\n                  name {\n                    firstName\n                    lastName\n                    designation\n                    middleName\n                  }\n                  email\n                  address {\n                    country\n                    line1\n                    state\n                    town\n                  }\n                  dob\n                  nationality\n                  phone{\n                    code\n                    number\n                  }\n                  passportExpiry\n                  passportNumber\n                  additionalInformation\n                  additionalTravellers\n                }\n              }\n            }\n          }\n        ": types.BookingsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n            #graphql\n            mutation AddBooking($booking:AddBookingInput!){\n                addBooking(booking:$booking)\n            }\n        "): (typeof documents)["\n            #graphql\n            mutation AddBooking($booking:AddBookingInput!){\n                addBooking(booking:$booking)\n            }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      #graphql\n      query SingleBooking($id:String!){\n        booking(id: $id){\n          email\n          tour\n          optionalTours {\n            price\n          }\n        }\n      }\n    "): (typeof documents)["\n      #graphql\n      query SingleBooking($id:String!){\n        booking(id: $id){\n          email\n          tour\n          optionalTours {\n            price\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      #graphql\n      mutation StagedExtrasBooking($id:ID!,$stagedOptionalTours:[OptionalTourInput!]){\n        updateBooking(booking: {stagedOptionalTours:$stagedOptionalTours, id:$id})\n      }\n    "): (typeof documents)["\n      #graphql\n      mutation StagedExtrasBooking($id:ID!,$stagedOptionalTours:[OptionalTourInput!]){\n        updateBooking(booking: {stagedOptionalTours:$stagedOptionalTours, id:$id})\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        #graphql\n        mutation AddUser($user: AddUserInput!) {\n          addUser(user:$user){\n            access\n            refresh\n          }\n        }\n      "): (typeof documents)["\n        #graphql\n        mutation AddUser($user: AddUserInput!) {\n          addUser(user:$user){\n            access\n            refresh\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        #graphql\n        query LoginUser($email: String!, $password:String!){\n          loginUser(email: $email, password:$password){\n            access\n            refresh\n          }\n        }\n      "): (typeof documents)["\n        #graphql\n        query LoginUser($email: String!, $password:String!){\n          loginUser(email: $email, password:$password){\n            access\n            refresh\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      #graphql\n      query GetAccessToken($refreshToken: String!, $secret:String!){\n        getAccessToken(refreshToken: $refreshToken, secret:$secret){\n          refresh\n          access\n        }\n      }\n\n    "): (typeof documents)["\n      #graphql\n      query GetAccessToken($refreshToken: String!, $secret:String!){\n        getAccessToken(refreshToken: $refreshToken, secret:$secret){\n          refresh\n          access\n        }\n      }\n\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n            #graphql\n            mutation UpdateBookingExtras($id:String!,$key:String!){\n              completeExtrasBooking(booking: $id, token:$key)\n            }\n          "): (typeof documents)["\n            #graphql\n            mutation UpdateBookingExtras($id:String!,$key:String!){\n              completeExtrasBooking(booking: $id, token:$key)\n            }\n          "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n            #graphql\n            query GetBooking($id:String!){\n              booking(id: $id){\n                email\n              }\n            }\n          "): (typeof documents)["\n            #graphql\n            query GetBooking($id:String!){\n              booking(id: $id){\n                email\n              }\n            }\n          "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n            #graphql\n            mutation UpdateBookingPayment($id:String!, $key:String!, $paid:Int!){\n              completeBooking(booking: $id, token:$key, paid:$paid)\n            }"): (typeof documents)["\n            #graphql\n            mutation UpdateBookingPayment($id:String!, $key:String!, $paid:Int!){\n              completeBooking(booking: $id, token:$key, paid:$paid)\n            }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      #graphql\n      query GetUser{\n        user{\n          name{\n            firstName\n            designation\n            middleName\n            lastName\n          }\n          dob\n          email\n          phone {\n            number\n            code\n          }\n          nationality\n        }\n      }\n    "): (typeof documents)["\n      #graphql\n      query GetUser{\n        user{\n          name{\n            firstName\n            designation\n            middleName\n            lastName\n          }\n          dob\n          email\n          phone {\n            number\n            code\n          }\n          nationality\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n              #graphql\n              mutation UpdateRequests($requests:[String!], $id:ID!){\n                updateBooking(booking: {requests: $requests, id: $id})\n              }\n            "): (typeof documents)["\n              #graphql\n              mutation UpdateRequests($requests:[String!], $id:ID!){\n                updateBooking(booking: {requests: $requests, id: $id})\n              }\n            "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        #graphql\n        mutation UpdateBooking($booking: UpdateBookingInput!){\n          updateBooking(booking: $booking)\n        }\n      "): (typeof documents)["\n        #graphql\n        mutation UpdateBooking($booking: UpdateBookingInput!){\n          updateBooking(booking: $booking)\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      #graphql\n      mutation UpdateFlightInfo($booking:UpdateBookingInput!){\n        updateBooking(booking: $booking)\n      }\n    "): (typeof documents)["\n      #graphql\n      mutation UpdateFlightInfo($booking:UpdateBookingInput!){\n        updateBooking(booking: $booking)\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        #graphql\n        mutation UpdateUser($user: UpdateUserInput!){\n          updateUser(user: $user){\n            name {\n                firstName\n            }\n          }\n        }\n      "): (typeof documents)["\n        #graphql\n        mutation UpdateUser($user: UpdateUserInput!){\n          updateUser(user: $user){\n            name {\n                firstName\n            }\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        #graphql\n        mutation UpdateUserPassword($email:String!, $old_password: String!, $new_password: String!){\n          updateUserPassword(email: $email, old_password: $old_password, new_password: $new_password)\n        }\n      "): (typeof documents)["\n        #graphql\n        mutation UpdateUserPassword($email:String!, $old_password: String!, $new_password: String!){\n          updateUserPassword(email: $email, old_password: $old_password, new_password: $new_password)\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n          #graphql\n          query Bookings{\n            user{\n              bookings {\n                tour\n                email\n                requests\n                from\n                paid\n                flights{\n                  airCompany\n                  arrivalAirport\n                  arrivalTime\n                  departureTime\n                  flightNumber\n                }\n                price\n                to\n                optionalTours {\n                  cityID\n                  visitID\n                }\n                _id\n                adults {\n                  name {\n                    firstName\n                    lastName\n                    designation\n                    middleName\n                  }\n                  email\n                  address {\n                    country\n                    line1\n                    state\n                    town\n                  }\n                  dob\n                  nationality\n                  phone{\n                    code\n                    number\n                  }\n                  passportExpiry\n                  passportNumber\n                  additionalInformation\n                  additionalTravellers\n                }\n              }\n            }\n          }\n        "): (typeof documents)["\n          #graphql\n          query Bookings{\n            user{\n              bookings {\n                tour\n                email\n                requests\n                from\n                paid\n                flights{\n                  airCompany\n                  arrivalAirport\n                  arrivalTime\n                  departureTime\n                  flightNumber\n                }\n                price\n                to\n                optionalTours {\n                  cityID\n                  visitID\n                }\n                _id\n                adults {\n                  name {\n                    firstName\n                    lastName\n                    designation\n                    middleName\n                  }\n                  email\n                  address {\n                    country\n                    line1\n                    state\n                    town\n                  }\n                  dob\n                  nationality\n                  phone{\n                    code\n                    number\n                  }\n                  passportExpiry\n                  passportNumber\n                  additionalInformation\n                  additionalTravellers\n                }\n              }\n            }\n          }\n        "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;