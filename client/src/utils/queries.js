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
