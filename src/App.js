import "./App.css";

import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { find, flow } from "lodash/fp";

import { DATA_ITEMS } from "./constants";
import Suggestions from "./components/Suggestions";
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

const getPort = label =>
  flow(
    find(item => item.label === label),
    item => item.port
  )(DATA_ITEMS);

const Form = flow(
  withState("ip", "setIP"),
  withState("port", "setPort"),
  withState("coin", "setCoin")
)(({ ip, port, coin, setIP, setPort, setCoin }) => (
  <>
    <Suggestions onSelect={item => setCoin(item)} />
    <br />
    <Grid container spacing={16}>
      <Grid item xs={9} sm={10}>
        <TextFieldEditable
          label={"IP"}
          fullWidth
          onChange={e => setIP(e.target.value)}
        />
      </Grid>
      <Grid item xs={3} sm={2}>
        <TextFieldEditable
          label={"Port"}
          fullWidth
          value={port}
          onChange={e => setPort(e.target.value)}
        />
        {!!coin && port !== getPort(coin) ? (
          <Typography variant={"caption"} style={{ marginTop: "4px" }}>
            Suggestion:
            <u
              style={{
                marginLeft: "4px",
                cursor: "pointer"
              }}
              onClick={() => setPort(getPort(coin))}
            >
              {getPort(coin)}
            </u>
          </Typography>
        ) : null}
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
  </>
));

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
            <Form />
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
