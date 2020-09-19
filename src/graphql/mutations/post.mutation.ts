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
    mutation AddPostData($postId: String, $pros: Boolean, $title: String) {
      AddPostData(postId: $postId, pros: $pros, title: $title)
    }
  `,
  UPDATE_POST_DATA: gql`
    mutation UpdatePostData(
      $postId: String
      $dataId: String
      $newDataTitle: String
    ) {
      UpdatePostData(
        postId: $postId
        dataId: $dataId
        newDataTitle: $newDataTitle
      )
    }
  `,
  REMOVE_POST_DATA: gql`
    mutation RemovePostData($postId: String, $dataId: String) {
      RemovePostData(postId: $postId, dataId: $dataId)
    }
  `,
  DELETE_POST: gql`
    mutation DeletePost($id: String) {
      DeletePost(id: $id)
    }
  `,
};
