import { WebSocketLink } from "apollo-link-ws";

export default new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "ws://checkmynode.com/subscriptions"
      : `ws://127.0.0.1:8080/subscriptions`,
  options: {
    reconnect: true,
    lazy: false,
    connectionCallback: error => {
      if (!!error) console.log(error);
    }
  }
});
