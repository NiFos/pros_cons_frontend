import { gql } from "@apollo/client";

export const postQuery = {
  GET_POST: gql`
    query Post($id: String) {
      Post(id: $id) {
        id
        title
        data {
          pros
          title
        }
      }
    }
  `,
};
