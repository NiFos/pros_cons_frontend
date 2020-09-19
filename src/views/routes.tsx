import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HomePage } from "./home-page";
import { Auth } from "./auth-page";
import { ListPage } from "./list-page";
import { PrivateRoute } from "../components/private-route";
import { CreatePage } from "./create-page";

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
      <Route path={"/create"} exact>
        <CreatePage />
      </Route>
      <Route path={"/post/:id"} exact>
        <CreatePage />
      </Route>
      <Redirect to={"/"} />
    </Switch>
  );
}
