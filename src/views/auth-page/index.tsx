import React from "react";
import { withRouter, RouteProps, Redirect } from "react-router-dom";
import { authWithOauth } from "../../lib/auth";

interface Props extends RouteProps {}

function AuthComponent(props: Props) {
  React.useEffect(() => {
    const query = props.location?.search;
    if (query) {
      authWithOauth(query);
    }
  });
  return <Redirect to={"/"} />;
}
export const Auth = withRouter(AuthComponent);
