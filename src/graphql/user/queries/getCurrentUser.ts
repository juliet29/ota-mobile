import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
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
