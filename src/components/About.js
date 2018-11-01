import { Paper, Typography } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import React from "react";

export const About = () => (
  <>
    <Paper
      style={{ padding: "20px", opacity: "0.8", backgroundColor: grey[800] }}
    >
      <Typography variant={"h6"} gutterBottom style={{ color: "white" }}>
        What’s this?
      </Typography>
      <Typography variant={"body2"} paragraph style={{ color: "white" }}>
        This is a tool for instant check of a masternode health.
      </Typography>
      <Typography variant={"h6"} gutterBottom style={{ color: "white" }}>
        How can it helps you?
      </Typography>
      <Typography
        variant={"body2"}
        paragraph
        component={"div"}
        style={{ color: "white" }}
      >
        It gives you information about wellness of your masternode.
        <Typography style={{ color: "white" }}>
          <ul>
            <li>does it answering properly </li>
            <li>does it operating in a right network</li>
            <li>what are other nodes thinking about your one</li>
            <li>...and a lot of other useful information</li>
          </ul>
        </Typography>
      </Typography>
      <Typography variant={"h6"} gutterBottom style={{ color: "white" }}>
        How it differ from others?
      </Typography>
      <Typography variant={"body2"} paragraph style={{ color: "white" }}>
        This is the only service that connects to your masternode directly and
        does a most of checks in real time.
      </Typography>
    </Paper>
  </>
);
