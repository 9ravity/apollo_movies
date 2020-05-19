import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

// apollo.js(graphql uri)를 만들고 - react를 apollo로 감싸기,

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
