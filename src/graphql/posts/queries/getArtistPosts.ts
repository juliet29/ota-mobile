import { gql } from "apollo-boost";

export const GET_ALBUM_POSTS = gql`
  query getArtistPosts($id: String!) {
    getArtistPosts(id: $id) {
      artistName
      text
      timeSubmitted
      user {
        username
      }
    }
  }
`;
