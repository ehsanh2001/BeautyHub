const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload
  # Type definitions for Booking
  type Booking {
    id: ID!
    date: String!
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
    owner: User
    id: ID!
    businessName: String!
    imageFileName: String
    businessType: String!
    services: [Service!]!
    address: String!
    phone: String!
    location: Location!
    staff: [Staff!]!
    openingHours: OpeningHours!
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
    password: String!
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

  # Input type definitions for OpeningHours
  type OpeningHours {
    Monday: [Boolean!]!
    Tuesday: [Boolean!]!
    Wednesday: [Boolean!]!
    Thursday: [Boolean!]!
    Friday: [Boolean!]!
    Saturday: [Boolean!]!
    Sunday: [Boolean!]!
  }

  input OpeningHoursInput {
    Monday: [Boolean!]!
    Tuesday: [Boolean!]!
    Wednesday: [Boolean!]!
    Thursday: [Boolean!]!
    Friday: [Boolean!]!
    Saturday: [Boolean!]!
    Sunday: [Boolean!]!
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
    business(userId: ID!): Business
    customer: Customer
    businessNearby(lat: Float!, lng: Float!, maxDistance: Float!): Business
    searchBusinessesBySeriveOrName(searchTerm: String!): [Business]
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

    deleteBooking(id: ID!): Customer

    addBusiness(
      owner: ID!
      businessName: String!
      businessType: String!
      services: [ServiceInput!]!
      address: String!
      phone: String
      location: LocationInput!
      staff: [StaffInput!]!
      openingHours: OpeningHoursInput!
      imageFileName: String
    ): Business

    uploadImage(file: Upload!): String

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
