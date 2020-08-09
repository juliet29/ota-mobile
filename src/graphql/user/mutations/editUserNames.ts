import { gql } from "apollo-boost";

export const EDIT_USER_NAMES = gql`
  mutation EditUserNames($data: EditUserInput!) {
    EditUserNames(data: $data)
  }
`;
