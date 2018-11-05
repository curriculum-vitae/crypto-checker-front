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
  withState("value", "setValue", ""),
  withHandlers({
    onSubmit: props => e => {
      window.alert("API Call (TODO)");
      e.preventDefault();
    }
  }),
  setDisplayName("Email")
)(({ onSubmit, value, setValue }) => (
  <Paper
    style={{
      padding: "20px"
    }}
  >
    <Typography variant={"h5"} gutterBottom>
      Subscribe to get excited
    </Typography>
    <form onSubmit={onSubmit}>
      <TextField
        placeholder={"Email"}
        fullWidth
        error={!!value && !isValidEmail(value)}
        helperText={
          !!value && !isValidEmail(value)
            ? "Please enter a valid email"
            : undefined
        }
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
  </Paper>
));
