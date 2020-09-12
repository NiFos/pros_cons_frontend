import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./home-page";
import { Auth } from "./auth-page";
import { ListPage } from "./list-page";

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route path={"/"} exact>
        <HomePage />
      </Route>
      <Route path={"/auth"} exact>
        <Auth />
      </Route>
      <Route path={"/list"} exact>
        <ListPage />
      </Route>
    </Switch>
  );
}
