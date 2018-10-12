import {
  CssBaseline,
  Grid,
  MuiThemeProvider,
  Paper,
  Typography
} from "@material-ui/core";
import React, { Component } from "react";

import { SubmitForm } from "features/SubmitForm";
import { Wallpaper } from "components/Wallpaper";
import { theme } from "theme.js";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Wallpaper />
        <Grid container justify={"center"} style={{ padding: "12px" }}>
          <Grid item xs={12} sm={8} md={6} lg={6} xl={4}>
            <Paper style={{ padding: "20px", marginTop: "-80px" }}>
              <Typography variant={"h4"} align={"center"} gutterBottom>
                Crypto Checker v0.0.1
              </Typography>
              <SubmitForm
                onSubmit={data => window.alert(JSON.stringify(data))}
              />
            </Paper>
            <br />
            <br />
            <br />
            <br />

            <Paper style={{ padding: "20px" }}>
              <Typography paragraph>
                You are using a trial version of this programm.
              </Typography>
              <Typography>
                To send cool requests please consider upgrading.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
