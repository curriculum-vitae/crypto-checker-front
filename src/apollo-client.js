import { concat, split } from "apollo-link";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { onError } from "apollo-link-error";

// Create an http link:
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://crypto-checker.now.sh/graphql"
      : "http://localhost:4000/graphql"
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "wss://crypto-checker.now.sh/graphql"
      : `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const errorsLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    debugger;
    console.log("HANDLER ERRORS");
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );

    if (networkError) console.log(`[Network error]: ${networkError}`);
    // return forward(operation);
  }
);

const client = new ApolloClient({
  link: concat(errorsLink, link),
  cache: new InMemoryCache()
});

export default client;
