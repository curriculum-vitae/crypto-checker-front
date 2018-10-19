import { compose, lifecycle } from "recompose";

import React from "react";
import { Typography } from "@material-ui/core";
import apolloClientLinkWS from "apollo-client-link-ws.js";

export default compose(
  lifecycle({
    componentDidMount() {
      apolloClientLinkWS.subscriptionClient.on("disconnected", () => {
        this.setState({
          status: "Connection to a server lost"
        });
      });

      apolloClientLinkWS.subscriptionClient.on("connected", () => {
        this.setState({
          status: null
        });
      });
      apolloClientLinkWS.subscriptionClient.on("reconnected", () => {
        this.setState({
          status: null
        });
      });
    }
  })
)(
  ({ status }) =>
    !!status ? (
      <Typography
        variant={"button"}
        align={"center"}
        style={{
          padding: "10px",
          backgroundColor: "red",
          color: "white"
        }}
      >
        {status}
      </Typography>
    ) : null
);
