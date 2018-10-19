import {
  CssBaseline,
  Grid,
  MuiThemeProvider,
  Paper,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import { SubmitFormWithUnits } from "features/SubmitFormWithUnits";
import { Wallpaper } from "components/Wallpaper";
import client from "apollo-client.js";
import { theme } from "theme.js";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Wallpaper />
          <div style={{ padding: "12px" }}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={2} md={3} xl={4}>
                <Paper style={{ padding: "20px" }}>
                  <Typography variant={"h6"} gutterBottom>
                    What’s this?
                  </Typography>
                  <Typography variant={"body2"} paragraph>
                    This is a tool for instant check of a masternode health.
                  </Typography>
                </Paper>
                <br />
                <Paper style={{ padding: "20px" }}>
                  <Typography variant={"h6"} gutterBottom>
                    How can it helps you?
                  </Typography>
                  <Typography variant={"body2"} paragraph>
                    It gives you information about wellness of your masternode.
                    <ul>
                      <li>does it answering properly </li>
                      <li>does it operating in a right network</li>
                      <li>what are other nodes thinking about your one</li>
                      <li>...and a lot of other useful information</li>
                    </ul>
                  </Typography>
                </Paper>
                <br />
                <Paper style={{ padding: "20px" }}>
                  <Typography variant={"h6"} gutterBottom>
                    How it differ from others?
                  </Typography>
                  <Typography variant={"body2"} paragraph>
                    This is the only service that connects to your masternode
                    directly and does a most of checks in real time.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={8} md={6} xl={4}>
                <div style={{ marginTop: "-160px" }}>
                  <SubmitFormWithUnits />
                </div>
                <br />
                <br />
                <br />
                <br />
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
