export const CONFIG_KEY = "REACT_APP_GLOBAL_NODE_CHECKER_CONFIG_$";

const CONFIG = window[CONFIG_KEY] || {};

export const URI_LINK_WEBSOCKET =
  CONFIG["URI_LINK_WEBSOCKET"] || process.env.NODE_ENV === "production"
    ? "wss://checkmynode.com/subscriptions"
    : `wss://checkmynode.com/subscriptions`;

export const URL_LINK_HTTP =
  CONFIG["URL_LINK_HTTP"] || process.env.NODE_ENV === "production"
    ? "/graphql"
    : "http://127.0.0.1:8080/graphql";
