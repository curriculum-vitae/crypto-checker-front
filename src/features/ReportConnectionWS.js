import { compose, lifecycle } from "recompose";

import { ConnectionWarning } from "components/ConnectionWarning";
import React from "react";
import { Typography } from "@material-ui/core";
import apolloClientLinkWS from "apollo-client-link-ws.js";

/*
  Docs about events
  https://github.com/apollographql/subscriptions-transport-ws
*/

const EVENTS = ["disconnected", "error"];

export default compose(
  lifecycle({
    componentDidMount() {
      this.client = apolloClientLinkWS.subscriptionClient;
      this.offs = EVENTS.map(eventName =>
        this.client.on(eventName, () =>
          this.setState({
            isDisconnectionIsDetected: true
          })
        )
      );
    },
    /*
    TODO:
      - Test.
    */
    componentWillUnmount() {
      const offs = this.offs;
      offs.forEach(off => off());
    }
  })
)(
  ({ isDisconnectionIsDetected }) =>
    !!isDisconnectionIsDetected ? <ConnectionWarning /> : null
);
