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
          <div style={{ padding: "12px", marginTop: "-160px" }}>
            <Grid container spacing={24} justify={"center"}>
              <Grid item xs={12} sm={10} md={6} xl={4}>
                <SubmitFormWithUnits />
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
