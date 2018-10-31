import { compose, lifecycle } from "recompose";

import { ConnectionWarning } from "components/ConnectionWarning";
import React from "react";
import apolloClientLinkWS from "apollo-client-link-ws.js";

/*
  Docs about events
  https://github.com/apollographql/subscriptions-transport-ws
*/

const EVENTS = ["disconnected", "error"];

export default compose(
  lifecycle({
    componentDidMount() {
      const { onError = () => {}, onDisconnected = () => {} } = this.props;
      this.client = apolloClientLinkWS.subscriptionClient;

      this.offs = [];

      this.offs.push(this.client.on(EVENTS[0], onDisconnected.bind(this)));
      this.offs.push(this.client.on(EVENTS[1], onError.bind(this)));
    },
    /*
    TODO:
      - Test.
    */
    componentWillUnmount() {
      this.offs.forEach(off => off());
    }
  })
)(({ isDisconnectionIsDetected }) => null);
