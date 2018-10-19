import { CssBaseline, Grid, MuiThemeProvider } from "@material-ui/core";
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
          <Grid container justify={"center"} style={{ padding: "12px" }}>
            <Grid item xs={12} sm={8} md={6} lg={6} xl={4}>
              <div style={{ marginTop: "-80px" }}>
                <SubmitFormWithUnits />
              </div>
              <br />
              <br />
              <br />
              <br />
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
