import React from "react";
import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "../lib/theme";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authtorization: localStorage.getItem("authorization"),
          refreshToken: localStorage.getItem("refreshToken"),
        },
      });
      return forward(operation).map((response) => {
        const {
          response: { headers },
        } = operation.getContext();
        if (headers.get("authorization")) {
          const tokens = {
            authorization: headers.get("authorization"),
            refreshToken: headers.get("refreshToken"),
          };
          localStorage.setItem("authorization", tokens.authorization);
          localStorage.setItem("refreshToken", tokens.refreshToken);
        }
        return response;
      });
    }),
    new HttpLink({
      uri: "https://pros-and-cons.herokuapp.com/",
    }),
  ]),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
