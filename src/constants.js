export const CONFIG_KEY = "REACT_APP_GLOBAL_NODE_CHECKER_CONFIG_$";

const CONFIG = window[CONFIG_KEY] || {};

export const URI_LINK_WEBSOCKET =
  CONFIG["URI_LINK_WEBSOCKET"] || "wss://checkmynode.com/subscriptions";

export const URL_LINK_HTTP = CONFIG["URL_LINK_HTTP"] || "/graphql";

export const COINS = CONFIG["COINS"] || [["DASH", "Dash", 9999]];
