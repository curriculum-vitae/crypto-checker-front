import { WebSocketLink } from "apollo-link-ws";

export default new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "ws://checkmynode.com/subscriptions"
      : `ws://checkmynode.com/subscriptions`,
  options: {
    reconnect: true,
    lazy: true,
    connectionCallback: error => {
      console.log("Connection callback");
      if (!!error) console.log(error);
    }
  }
});
