import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      text
      link
      timeSubmitted
      id
      user {
        username
      }
    }
  }
`;
