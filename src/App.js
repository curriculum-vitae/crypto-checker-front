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
              <Grid item xs={12} sm={2} md={3} xl={4} />
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
