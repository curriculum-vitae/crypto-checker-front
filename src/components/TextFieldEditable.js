import React from "react";
import { TextField } from "@material-ui/core";
import { flow } from "lodash/fp";
import { withState } from "recompose";

export const TextFieldEditable = flow(
  withState("value", "setValue", ({ value }) => value)
)(({ ...props }) => <TextField {...props} />);
