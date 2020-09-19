import { gql } from "@apollo/client";

export const postMutation = {
  CREATE_POST: gql`
    mutation CreatePost($title: String) {
      CreatePost(title: $title)
    }
  `,
  UPDATE_POST_TITLE: gql`
    mutation UpdatePostTitle($title: String, $id: String) {
      UpdatePostTitle(title: $title, id: $id)
    }
  `,
  ADD_POST_DATA: gql`
    mutation AddPostData($id: String, $pros: Boolean, $title: String) {
      AddPostData(id: $id, pros: $pros, title: $title)
    }
  `,
  UPDATE_POST_DATA: gql`
    mutation UpdatePostData(
      $postId: String
      $dataTitle: String
      $pros: Boolean
      $newDataTitle: String
    ) {
      UpdatePostData(
        postId: $postId
        dataTitle: $dataTitle
        pros: $pros
        newDataTitle: $newDataTitle
      )
    }
  `,
  REMOVE_POST_DATA: gql`
    mutation RemovePostData(
      $postId: String
      $dataTitle: String
      $pros: Boolean
    ) {
      RemovePostData(postId: $postId, dataTitle: $dataTitle, pros: $pros)
    }
  `,
  DELETE_POST: gql`
    mutation DeletePost($id: String) {
      DeletePost(id: $id)
    }
  `,
};
