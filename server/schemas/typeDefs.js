const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Type definitions for Booking
  scalar Upload

  type Booking {
    id: ID!
    date: String! # GraphQL doesn't have a Date type by default
    customer: Customer
    business: Business
    staffName: String!
    service: Service!
  }

  # Type definitions for Service
  type Service {
    serviceName: String!
    price: Float!
  }

  # Input type definitions for Service
  input ServiceInput {
    serviceName: String!
    price: Float!
  }

  # Type definitions for Business
  type Business {
    id: ID!
    businessName: String!
    imageFileName: String
    businessType: String!
    services: [Service!]!
    address: String!
    phone: String!
    location: Location!
    staff: [Staff!]!
    openingHours: [OpeningHour!]!
  }

  # Type definitions for Location
  type Location {
    type: String!
    coordinates: [Float!]! # [longitude, latitude]
  }

  # Input type definitions for Location
  input LocationInput {
    type: String!
    coordinates: [Float!]!
  }

  # Type definitions for Staff
  type Staff {
    name: String!
    imageFileName: String
    bookings: [Booking!]!
  }

  # Input type definitions for Staff
  input StaffInput {
    name: String!
    imageFileName: String
  }

  # Type definitions for OpeningHour
  type OpeningHour {
    day: String!
    hours: [String!]!
  }

  # Input type definitions for OpeningHour
  input OpeningHourInput {
    day: String!
    hours: [String!]!
  }

  # Type definitions for Customer
  type Customer {
    id: ID!
    name: String!
    phone: String!
    bookings: [Booking!]!
  }

  type Image {
    url: String!
  }

  # Type definitions for Auth
  type User {
    id: ID!
    username: String!
    role: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  # -----------------------------------------------
  # Queries
  # -----------------------------------------------
  type Query {
    image(filename: String!): Image
    businesses: [Business]
    businessesByType(businessType: String!): [Business]
    business(id: ID!): Business
    customer(id: ID!): Customer
    businessNearby(lat: Float!, lng: Float!, maxDistance: Float!): [Business]
  }

  # -----------------------------------------------
  # Mutations
  # -----------------------------------------------
  type Mutation {
    addCustomer(name: String!, phone: String!): Customer
    addBooking(
      date: String!
      customer: ID!
      business: ID!
      staffName: String!
      service: ServiceInput!
    ): Booking

    deleteBooking(id: ID!): Booking

    addBusiness(
      businessName: String!
      businessType: String!
      services: [ServiceInput!]!
      address: String!
      phone: String!
      location: LocationInput!
      staff: [StaffInput!]!
      openingHours: [OpeningHourInput!]!
    ): Business

    uploadImage(businessId: ID!, file: Upload!): Business

    addStaff(
      businessName: String!
      name: String!
      imageFileName: String
    ): Business

    deleteStaff(businessName: String!, staffName: String!): Business

    addUser(username: String!, password: String!, role: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
