import React from "react";
import {
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Icon
} from "@material-ui/core";
import { isValidEmail } from "helpers.js";
import { compose, setDisplayName, withState, withHandlers } from "recompose";

export default compose(
  withState("value", "setValue", "rogov.dmitry@gmail.com"),

  withHandlers({
    onSubmit: ({ onSubmit, value, setValue }) => e => {
      e.preventDefault();
      if (isValidEmail(value)) {
        onSubmit({ email: value });
        setValue("");
      }
    }
  }),
  setDisplayName("Email")
)(({ onSubmit, value, setValue }) => (
  <form onSubmit={onSubmit}>
    <TextField
      variant={"outlined"}
      placeholder={"Email"}
      fullWidth
      error={!!value && !isValidEmail(value)}
      helperText={
        !!value && !isValidEmail(value)
          ? "Please enter a valid email"
          : undefined
      }
      margin={"normal"}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment
            onClick={onSubmit}
            style={{
              cursor: "pointer"
            }}
            position="start"
          >
            <Icon>send</Icon>
          </InputAdornment>
        )
      }}
    />
  </form>
));
