import React from "react";
import { Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const ConnectionWarning = ({ palette = red }) => (
  <div style={{ padding: "10px", backgroundColor: palette[700] }}>
    <Typography
      variant={"button"}
      align={"center"}
      style={{
        color: "white"
      }}
    >
      Connection problems
    </Typography>
    <Typography
      variant={"body2"}
      align={"center"}
      style={{
        color: "white"
      }}
    >
      Some test results might be missing. Please refresh.
    </Typography>
  </div>
);
