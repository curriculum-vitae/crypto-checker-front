import "./App.css";

import {
  Button,
  CssBaseline,
  Grid,
  MuiThemeProvider,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";
import { find, flow } from "lodash/fp";

import { DATA_ITEMS } from "./constants";
import Suggestions from "./components/Suggestions";
import blue from "@material-ui/core/colors/blue";
import { createMuiTheme } from "@material-ui/core/styles";
import { withState } from "recompose";

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

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
  // TODO
  // @material-ui/core forces to set initial state so animation works properly
  withState("port", "setPort", ""),
  withState("coin", "setCoin")
)(({ ip, port, coin, setIP, setPort, setCoin, onSubmit }) => (
  <>
    <Suggestions onSelect={item => setCoin(item)} />
    <br />
    <Grid container spacing={16}>
      <Grid item xs={9} sm={10}>
        <TextFieldEditable
          autoFocus={false}
          label={"IP"}
          fullWidth
          variant={"outlined"}
          onChange={e => setIP(e.target.value)}
        />
      </Grid>
      <Grid item xs={3} sm={2}>
        <TextFieldEditable
          label={"Port"}
          fullWidth
          variant={"outlined"}
          onChange={e => setPort(e.target.value)}
          type={"number"}
          InputProps={{
            value: port
          }}
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
    <Button
      color={"primary"}
      variant={"contained"}
      onClick={() => onSubmit({ ip, port, coin })}
    >
      Check
    </Button>
  </>
));

const Wallpaper = () => (
  <div
    style={{
      backgroundImage: `url("./images/bg.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      height: "400px"
    }}
  />
);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Wallpaper />
        <Grid container justify={"center"} style={{ padding: "12px" }}>
          <Grid item xs={12} md={6}>
            <br />
            <br />
            <br />
            <br />

            <br />
            <Paper style={{ padding: "20px", marginTop: "-200px" }}>
              <Typography variant={"h4"} align={"center"} gutterBottom>
                Crypto Checker v0.0.1
              </Typography>
              <Form
                onSubmit={data => {
                  window.alert(JSON.stringify(data));
                }}
              />
            </Paper>
            <br />
            <br />
            <br />
            <br />

            <Paper style={{ padding: "20px" }}>Connection — ok.</Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
