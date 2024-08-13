import { gql } from "@apollo/client";

export const ADD_BUSINESS = gql`
  mutation Mutation(
    $businessName: String!
    $businessType: String!
    $services: [ServiceInput!]!
    $address: String!
    $location: LocationInput!
    $staff: [StaffInput!]!
    $openingHours: OpeningHoursInput!
    $phone: String
    $imageFileName: String
  ) {
    addBusiness(
      businessName: $businessName
      businessType: $businessType
      services: $services
      address: $address
      location: $location
      staff: $staff
      openingHours: $openingHours
      phone: $phone
      imageFileName: $imageFileName
    ) {
      id
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $password: String!, $role: String!) {
    addUser(username: $username, password: $password, role: $role) {
      token
      user {
        id
        username
        role
        password
      }
    }
  }
`;
