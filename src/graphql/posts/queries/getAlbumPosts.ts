import { gql } from "apollo-boost";

export const GET_ALBUM_POSTS = gql`
  query getAlbumPosts($id: String!) {
    getAlbumPosts(id: $id) {
      albumName
      artistNames
      text
      rating
      timeSubmitted
      user {
        username
      }
    }
  }
`;
