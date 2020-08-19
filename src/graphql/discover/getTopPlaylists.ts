import { gql } from "apollo-boost";

export const GET_TOP_PLAYLISTS = gql`
  query getTopPlaylists {
    getTopPlaylists {
      id
      playlistPicture
      tracks {
        id
        artists
        name
        trackImageUrl
        externalUrl
      }
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
  }
`;
