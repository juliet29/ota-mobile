import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      username
      email
    }
  }
`;
