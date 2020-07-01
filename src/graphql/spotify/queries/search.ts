import { gql } from "apollo-boost";

export const SEARCH_SPOTIFY = gql`
  query search($type: String!, $query: String!) {
    search(type: $type, query: $query) {
      artists {
        items {
          name
        }
      }
    }
  }
`;
