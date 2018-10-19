import { WebSocketLink } from "apollo-link-ws";

export default new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "wss://crypto-checker.now.sh/graphql"
      : `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    connectionCallback: error => {
      console.log("Connection callback!");
      console.log(error);
    }
  }
});
