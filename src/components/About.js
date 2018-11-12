import { Paper, Typography } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";
import React from "react";

export const About = () => (
  <>
    <Paper
      style={{ padding: "20px", opacity: "0.8", backgroundColor: grey[800] }}
    >
      <Typography variant={"h6"} gutterBottom style={{ color: "white" }}>
        What is this?
      </Typography>
      <Typography variant={"body2"} paragraph style={{ color: "white" }}>
        This is a tool to instantly check the masternode health.
      </Typography>
      <Typography variant={"h6"} gutterBottom style={{ color: "white" }}>
        How can it help you?
      </Typography>
      <Typography
        variant={"body2"}
        paragraph
        component={"div"}
        style={{ color: "white" }}
      >
        It gives you information about the condition of your masternode.
        <Typography style={{ color: "white" }} component={"div"}>
          <ul>
            <li>Is it answering properly?</li>
            <li>Is it operating in the right network?</li>
            <li>What other nodes are thinking about yours?</li>
            <li>...and a lot of other useful information.</li>
          </ul>
        </Typography>
      </Typography>
      <Typography variant={"h6"} gutterBottom style={{ color: "white" }}>
        How does it differ from others?
      </Typography>
      <Typography variant={"body2"} paragraph style={{ color: "white" }}>
        This is the only service that connects to your masternode directly and
        conducts checks in real time.
      </Typography>
    </Paper>
  </>
);
