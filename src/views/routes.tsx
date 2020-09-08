import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage } from "./home-page";

interface Props {}

export function Routes(props: Props) {
  return (
    <Switch>
      <Route>
        <HomePage />
      </Route>
    </Switch>
  );
}
