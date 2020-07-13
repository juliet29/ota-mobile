import { gql } from "apollo-boost";

export const GET_ALBUM_POSTS = gql`
  query getTrackPosts($id: String!) {
    getTrackPosts(id: $id) {
      trackName
      text
      vote
      timeSubmitted
      user {
        username
      }
    }
  }
`;
