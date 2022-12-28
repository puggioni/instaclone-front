import { Button } from "semantic-ui-react";
import React from "react";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Button>Click Here</Button>
      </div>
    </ApolloProvider>
  );
}
