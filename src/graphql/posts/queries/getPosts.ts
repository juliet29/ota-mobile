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
        user {
          username
        }
      }
      ... on ArtistPost {
        text
        imageUrl
        timeSubmitted
        artistId
        user {
          username
        }
      }
    }
  }
`;
