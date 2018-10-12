import React from "react";
import { TextField } from "@material-ui/core";
import { flow } from "lodash/fp";
import { withState } from "recompose";

export const TextFieldEditable = flow(withState("query", "setQuery"))(
  ({ query, setQuery, ...props }) => (
    <TextField
      value={query}
      onChange={e => setQuery(e.target.value)}
      {...props}
    />
  )
);
