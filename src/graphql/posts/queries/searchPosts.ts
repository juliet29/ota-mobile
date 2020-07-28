import { gql } from "apollo-boost";

export const SEARCH_POSTS = gql`
  query searchPosts($query: String) {
    searchPosts(query: $query) {
      ... on AlbumPost {
        text
        externalUrl
        artistNames
        albumName
        rating
        imageUrl
        timeSubmitted
        albumId
        user {
          username
        }
      }
      ... on TrackPost {
        text
        artistNames
        externalUrl
        trackName
        vote
        imageUrl
        timeSubmitted

        trackId
        user {
          username
        }
      }
      ... on ArtistPost {
        text
        imageUrl
        artistName
        timeSubmitted
        artistId
        user {
          username
        }
      }
    }
  }
`;
