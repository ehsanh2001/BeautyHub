import { gql } from "@apollo/client";

export const GET_ALL_BUSINESSES = gql`
  query Query {
    businesses {
      id
      businessName
      imageFileName
      businessType
      address
      phone
      services {
        price
        serviceName
      }
      staff {
        name
      }
      location {
        coordinates
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        role
        id
      }
    }
  }
`;

export const GET_BUSINESSE_BY_ID = gql`
  query Business($userId: ID!) {
    business(userId: $userId) {
      address
      businessName
      id
      businessType
      imageFileName
      owner {
        id
        role
        username
      }
      phone
      staff {
        name
      }
      location {
        type
        coordinates
      }
      openingHours {
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
      }
      services {
        serviceName
        price
      }
    }
  }
`;

export const GET_BUSINESSES_BY_TYPE = gql`
  query BusinessesByType($businessType: String!) {
    businessesByType(businessType: $businessType) {
      address
      businessName
      businessType
      id
      imageFileName
      location {
        coordinates
        type
      }
      phone
      services {
        serviceName
        price
      }
      staff {
        name
      }
      owner {
        id
      }
    }
  }
`;
