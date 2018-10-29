import { WebSocketLink } from "apollo-link-ws";

import { URI_LINK_WEBSOCKET } from "constants.js";

export default new WebSocketLink({
  uri: URI_LINK_WEBSOCKET,
  options: {
    reconnect: true,
    lazy: true,
    connectionCallback: error => {
      console.log("Connection callback");
      if (!!error) console.log(error);
    }
  }
});
