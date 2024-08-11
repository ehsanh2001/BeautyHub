import { gql } from "@apollo/client";

export const ADD_BUSINESS = gql`
  mutation Mutation(
    $businessName: String!
    $businessType: String!
    $services: [ServiceInput!]!
    $address: String!
    $phone: String
    $location: LocationInput!
    $staff: [StaffInput!]!
    $openingHours: OpeningHoursInput!
  ) {
    addBusiness(
      businessName: $businessName
      businessType: $businessType
      services: $services
      address: $address
      phone: $phone
      location: $location
      staff: $staff
      openingHours: $openingHours
    ) {
      id
    }
  }
`;
