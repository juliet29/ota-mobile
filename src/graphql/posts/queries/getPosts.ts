import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      ... on AlbumPost {
        text
        artistNames
        rating
        imageUrl
        timeSubmitted
        albumId
        albumName
        user {
          username
        }
      }
      ... on TrackPost {
        text
        artistNames
        vote
        imageUrl
        timeSubmitted
        trackId
        trackName
        user {
          username
        }
      }
      ... on ArtistPost {
        text
        imageUrl
        timeSubmitted
        artistId
        artistName
        user {
          username
        }
      }
    }
  }
`;
