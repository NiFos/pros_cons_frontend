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
  NormalizedCacheObject,
  gql,
} from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: () => !!localStorage.getItem("authorization"),
      },
    },
  },
});
const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: localStorage.getItem("authorization"),
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
      uri: "https://pros-and-cons.herokuapp.com/graphql",
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
