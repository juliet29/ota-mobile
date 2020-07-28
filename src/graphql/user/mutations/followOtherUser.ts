import { gql } from "apollo-boost";

export const FOLLOW_OTHER_USER = gql`
  mutation followOtherUser($id: Float, $follow: Boolean) {
    followOtherUser(id: $id, follow: $follow) {
      username
      followers
    }
  }
`;
