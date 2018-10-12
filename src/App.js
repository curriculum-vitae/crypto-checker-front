import "./App.css";

import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";

import Suggestions from "./components/Suggestions";
import { flow } from "lodash/fp";
import { withState } from "recompose";

const TextFieldEditable = flow(withState("query", "setQuery"))(
  ({ query, setQuery, ...props }) => (
    <TextField
      value={query}
      onChange={e => setQuery(e.target.value)}
      {...props}
    />
  )
);

class App extends Component {
  render() {
    return (
      <Grid container justify={"center"}>
        <Grid item xs={12} md={6}>
          <br />
          <br />
          <br />
          <br />
          <Typography variant={"title"}>Crypto checker v 0.0.1</Typography>
          <br />
          <Paper style={{ padding: "20px" }}>
            <Suggestions />

            <Grid container spacing={16}>
              <Grid item xs={9} sm={10}>
                <TextFieldEditable label={"IP"} fullWidth />
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextFieldEditable label={"Port"} fullWidth />
              </Grid>
            </Grid>
            <br />
            <br />
            <Button
              color={"primary"}
              variant={"contained"}
              style={{ textAlign: "right" }}
            >
              Check
            </Button>
          </Paper>
          <br />
          <br />
          <br />
          <br />

          <Paper style={{ padding: "20px" }}>Connection — ok.</Paper>
        </Grid>
      </Grid>
    );
  }
}

export default App;
