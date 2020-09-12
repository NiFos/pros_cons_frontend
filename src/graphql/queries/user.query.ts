import { gql } from "@apollo/client";

export const userQuery = {
  ME: gql`
    query {
      Me {
        email
        posts {
          id
          title
        }
      }
    }
  `,
};
