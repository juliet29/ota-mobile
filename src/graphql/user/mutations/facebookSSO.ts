import { gql } from "apollo-boost";

export const FACEBOOK_SSO = gql`
  mutation facebookSSO($data: FacebookRegisterInput!) {
    facebookRegisterAndLogIn(data: $data) {
      accessToken
    }
  }
`;
