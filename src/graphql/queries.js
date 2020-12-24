import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
      pageInfo {
        totalCount
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY_DETAIL = gql`
  query repositoryDetail($id: ID!) {
    repository(id: $id) {
      id
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }      
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;