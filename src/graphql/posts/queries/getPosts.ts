import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      ... on AlbumPost {
        text
        externalUrl
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
        externalUrl
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
        externalUrl
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
