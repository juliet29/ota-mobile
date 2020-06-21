import { gql } from "apollo-boost";

export const CREATE_POST = gql`
  mutation CreatePost($text: String!, $link: String!) {
    createPost(text: $text, link: $link)
  }
`;
