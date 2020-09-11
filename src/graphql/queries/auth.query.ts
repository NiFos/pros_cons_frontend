import { gql } from "@apollo/client";

export const authQuery = {
  GET_GOOGLE_OAUTH_LINK: gql`
    query Auth($type: OauthEnum) {
      Auth(type: $type)
    }
  `,
};
