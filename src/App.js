import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppRouter from "./routes/Router";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
