import { gql } from "apollo-boost";

export const GET_OTHER_USER = gql`
  query getOtherUser($id: Float) {
    getOtherUser(id: $id) {
      id
      username
      email
      followers
      topAlbums {
        name
        imageUrl
        id
        artistNames
      }
      topArtists {
        name
        imageUrl
        id
      }
      topTracks {
        name
        imageUrl
        id
        artistNames
      }
    }
  }
`;
