import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

interface Props {
  path: string;
  children: any;
}

export function PrivateRoute(props: Props) {
  const loggedInData = useQuery(IS_LOGGED_IN);

  return (
    <Route path={props.path}>
      {loggedInData.data.isLoggedIn ? props.children : <Redirect to={"/"} />}
    </Route>
  );
}
