import { gql } from "@apollo/client";

export const postMutation = {
  CREATE_POST: gql`
    mutation CreatePost($title: String) {
      CreatePost(title: $title)
    }
  `,
  UPDATE_POST_TITLE: gql`
    mutation UpdatePostTitle($title: String) {
      UpdatePostTitle(title: $title)
    }
  `,
  ADD_POST_DATA: gql`
    mutation AddPostData($id: String, $type: Boolean, $title: String) {
      AddPostData(id: $id, type: $type, type: $title)
    }
  `,
  UPDATE_POST_DATA: gql`
    mutation UpdatePostData(
      $postId: String
      $dataTitle: String
      $newDataTitle: String
    ) {
      UpdatePostData(
        postId: $postId
        dataTitle: $dataTitle
        newDataTitle: $newDataTitle
      )
    }
  `,
  REMOVE_POST_DATA: gql`
    mutation RemovePostData($postId: String, $dataTitle: String) {
      RemovePostData(postId: $postId, dataTitle: $dataTitle)
    }
  `,
  DELETE_POST: gql`
    mutation DeletePost($id: String) {
      DeletePost(id: $id)
    }
  `,
};
