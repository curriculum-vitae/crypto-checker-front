import {
  CssBaseline,
  Typography,
  Grid,
  Divider,
  MuiThemeProvider
} from "@material-ui/core";
import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import { SubmitFormWithUnits } from "features/SubmitFormWithUnits";

import client from "apollo-client.js";
import { theme } from "theme.js";

const SPACING = 24;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <br />
          <br />
          <br />
          <br />
          <Typography
            variant={"h3"}
            align={"center"}
            style={{ color: "white" }}
          >
            CheckMyNode.com
          </Typography>

          <Typography
            variant={"subtitle1"}
            align={"center"}
            gutterBottom
            style={{ color: "white" }}
          >
            Checking your nodes since 2018
          </Typography>

          <br />
          <Divider />
          <br />
          <br />
          <br />
          <div style={{ padding: `${SPACING / 2}px` }}>
            <Grid container spacing={SPACING} justify={"center"}>
              <Grid item xs={12} sm={10} md={6} xl={4}>
                <SubmitFormWithUnits />
              </Grid>
            </Grid>
          </div>
          <Typography
            align={"center"}
            style={{ color: "white", opacity: "0.75" }}
            gutterBottom
          >
            For any questions fill free to contact us by{" "}
            Telegram: <a href={"https://t.me/nodechecker"}>@nodechecker</a> or by email{" "}
            <a href={`mailto:admin@checkmynodes.com`}>admin@checkmynodes.com</a>
          </Typography>
          <Typography
            align={"center"}
            style={{ color: "white", opacity: "0.75" }}
            gutterBottom
          >
            <a href={"#"}>Donate BTC</a>
          </Typography>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
