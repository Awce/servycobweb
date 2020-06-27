import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppRouter from "./routes/Router";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "node-fetch";
import DictationState from "./context/dictations/DictationState";
import { setContext } from "apollo-link-context";

const httpLink = createHttpLink({
  //uri: "http://localhost:4000/",
  uri: "https://powerful-springs-44042.herokuapp.com/",
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <DictationState>
        <AppRouter />
      </DictationState>
    </ApolloProvider>
  );
}

export default App;
