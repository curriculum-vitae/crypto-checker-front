import {
  CssBaseline,
  Typography,
  Grid,
  Divider,
  Hidden,
  MuiThemeProvider
} from "@material-ui/core";
import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import { SubmitFormWithUnits } from "features/SubmitFormWithUnits";
import { Wallpaper } from "components/Wallpaper";
import client from "apollo-client.js";
import { theme } from "theme.js";

const SPACING = 24;

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <div style={{ padding: `${SPACING / 2}px` }}>
            <br />
            <br />
            <br />
            <br />
            <Hidden xsDown>
              <Typography
                variant={"h3"}
                align={"center"}
                style={{ color: "white" }}
                noWrap
              >
                CheckMyNode.com
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography
                variant={"h4"}
                align={"center"}
                style={{ color: "white" }}
                noWrap
              >
                CheckMyNode.com
              </Typography>
            </Hidden>

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
            <Grid container spacing={SPACING} justify={"center"}>
              <Grid item xs={12} sm={10} md={6} xl={4}>
                <SubmitFormWithUnits />
              </Grid>
            </Grid>
            <Typography
              align={"center"}
              style={{ color: "white", opacity: "0.75" }}
              gutterBottom
            >
              Chat for discussion: <a href={"https://t.me/checkmynodes"}>https://t.me/checkmynodes</a> 
            </Typography>
            <Typography
              align={"center"}
              style={{ color: "white", opacity: "0.75" }}
              gutterBottom
            >
              Privat message: <a href={"https://t.me/nodechecker"}>https://t.me/nodechecker</a> or <a href={"mailto:admin@checkmynode.com"}>admin@checkmynode.com</a>
            </Typography>
            <Typography
              align={"center"}
              style={{ color: "white", opacity: "0.75" }}
              gutterBottom
            >
              Donate BTC:
            </Typography>
            <Typography
              align={"center"}
              style={{ color: "white", opacity: "0.75" }}
              variant={"caption"}
              gutterBottom
            >
              3C7J6ejwQdfMYH5tx7pVysqVVqkNX7RPBa
            </Typography>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
