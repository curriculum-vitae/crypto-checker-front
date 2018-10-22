import { Paper, Typography } from "@material-ui/core";

import React from "react";

export const About = () => (
  <>
    <Paper style={{ padding: "20px" }}>
      <Typography variant={"h6"} gutterBottom>
        What’s this?
      </Typography>
      <Typography variant={"body2"} paragraph>
        This is a tool for instant check of a masternode health.
      </Typography>
      <Typography variant={"h6"} gutterBottom>
        How can it helps you?
      </Typography>
      <Typography variant={"body2"} paragraph>
        It gives you information about wellness of your masternode.
        <ul>
          <li>does it answering properly </li>
          <li>does it operating in a right network</li>
          <li>what are other nodes thinking about your one</li>
          <li>...and a lot of other useful information</li>
        </ul>
      </Typography>
      <Typography variant={"h6"} gutterBottom>
        How it differ from others?
      </Typography>
      <Typography variant={"body2"} paragraph>
        This is the only service that connects to your masternode directly and
        does a most of checks in real time.
      </Typography>
    </Paper>
  </>
);
