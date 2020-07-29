import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      ... on AlbumPost {
        id
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
        id
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
        id
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
