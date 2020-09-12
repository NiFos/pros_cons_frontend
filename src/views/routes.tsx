import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage } from "./home-page";
import { Auth } from "./auth-page";
import { ListPage } from "./list-page";
import { PrivateRoute } from "../components/private-route";

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route path={"/auth"}>
        <Auth />
      </Route>
      <PrivateRoute path={"/list"}>
        <ListPage />
      </PrivateRoute>
      <Route path={"/"} exact>
        <HomePage />
      </Route>
      <Redirect to={"/"} />
    </Switch>
  );
}
