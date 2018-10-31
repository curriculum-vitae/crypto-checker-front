import { WebSocketLink } from "apollo-link-ws";

import { URI_LINK_WEBSOCKET } from "constants.js";

export default new WebSocketLink({
  uri: URI_LINK_WEBSOCKET,
  options: {
    reconnect: true,
    lazy: true,
    inactivityTimeout: 1000 * 5,
    connectionCallback: error => {
      console.log("Connection callback");
      if (!!error) console.log(error);
    }
  }
});
