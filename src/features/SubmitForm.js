import {
  Button,
  Grid,
  Paper,
  Icon,
  Typography,
  Stepper,
  Step,
  StepContent,
  StepLabel,
  TextField
} from "@material-ui/core";
import { getPort, isValidIP, isValidPort, convertFormToURL } from "helpers.js";
import { setDisplayName, withState, defaultProps } from "recompose";
import { COINS } from "constants.js";
import React from "react";
import Suggestions from "components/Suggestions";

import { compose } from "lodash/fp";
import { grey } from "@material-ui/core/colors";
import keycode from "keycode";

const SPACING = 8;

const convertCoinsToSuggestions = data =>
  data.map(coin => ({
    key: coin[0],
    name: coin[1],
    port: coin[2]
  }));

export const SubmitForm = compose(
  defaultProps({
    initialValues: {},
    isResendIsAllowed: false
  }),
  withState("ip", "setIP", ({ initialValues }) => initialValues.ip),
  // TODO
  // @material-ui/core forces to set initial state to an empty string so animation works properly
  withState("port", "setPort", ({ initialValues }) => initialValues.port || ""),
  withState(
    "coin",
    "setCoin",
    ({ initialValues }) =>
      initialValues.coin ? `TODO (${initialValues.coin})` : undefined
  ),
  withState("hash", "setHash"),
  withState("isPortIsManuallyEdited", "setIsPortIsManuallyEdited", false),
  setDisplayName("SubmitForm")
)(
  ({
    ip,
    port,
    coin,
    hash,
    setHash,
    setIP,
    setPort,
    setCoin,
    onSubmit,
    isPortIsManuallyEdited,
    isResendIsAllowed,
    setIsPortIsManuallyEdited
  }) => (
    <Paper>
      <div style={{ padding: "28px 0px 0px 28px" }}>
        <Typography variant={"h6"} gutterBottom>
          Let's check your node!
        </Typography>
      </div>
      <Stepper
        orientation={"vertical"}
        style={{ borderRadius: "6px", marginTop: "0px", paddingTop: "0px" }}
      >
        <Step active completed={!!coin}>
          <StepLabel icon={<Icon>label</Icon>}>Choose a coin</StepLabel>
          <StepContent>
            <Suggestions
              suggestions={convertCoinsToSuggestions(COINS)}
              selectedItem={coin}
              onSelect={coin => {
                setCoin(coin);
                if (!isPortIsManuallyEdited && coin && !!getPort(coin)) {
                  setPort(getPort(coin));
                }
                if (!coin && !isPortIsManuallyEdited) setPort("");
              }}
            />
          </StepContent>
        </Step>
        <Step active completed={!!port && !!ip}>
          <StepLabel icon={<Icon>location_on</Icon>}>
            Set up an address
          </StepLabel>

          <StepContent>
            <Grid container spacing={SPACING}>
              <Grid item xs={8} sm={9}>
                <TextField
                  autoFocus={false}
                  error={!!ip && !isValidIP(ip)}
                  fullWidth
                  helperText={
                    !!ip && !isValidIP(ip) ? "IP is not valid" : undefined
                  }
                  label={"IP"}
                  onChange={e => setIP(e.target.value)}
                  value={ip}
                  variant={"outlined"}
                />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField
                  label={"Port"}
                  fullWidth
                  variant={"outlined"}
                  onKeyDown={e => {
                    if (keycode(e) === ".") e.preventDefault();
                    if (keycode(e) !== "tab") setIsPortIsManuallyEdited(true);
                  }}
                  type={"number"}
                  error={!!port && !isValidPort(port)}
                  helperText={
                    <>
                      {!!port && !isValidPort(port) ? (
                        "Port range is 1 - 65535"
                      ) : !!coin &&
                      getPort(coin) &&
                      parseInt(port, 10) !== parseInt(getPort(coin), 10) ? (
                        <Typography variant={"caption"} gutterBottom>
                          <span
                            style={{
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              setPort(getPort(coin));
                              setIsPortIsManuallyEdited(false);
                            }}
                          >
                            Reset to default ({getPort(coin)})
                          </span>
                        </Typography>
                      ) : null}
                    </>
                  }
                  InputProps={{
                    style: {
                      color:
                        Number(getPort(coin)) === Number(port)
                          ? grey[600]
                          : isPortIsManuallyEdited
                            ? undefined
                            : grey[600]
                    },
                    value: port,
                    onChange: e => {
                      const value = e.target.value;
                      const valueParsed = parseInt(value, 10);

                      if (valueParsed <= 0) return;
                      setPort(valueParsed);
                      setIsPortIsManuallyEdited(true);
                    }
                  }}
                />
              </Grid>
            </Grid>
            <Button
              style={{
                marginTop: "12px",
                width: "100%"
              }}
              color={"secondary"}
              variant={"outlined"}
              onClick={() => {
                setHash(convertFormToURL({ ip, port, coin }));
                onSubmit({ ip, port, coin });
              }}
              size={"large"}
              disabled={
                !port ||
                !coin ||
                !ip ||
                !isValidIP(ip) ||
                !isValidPort(port) ||
                (convertFormToURL({ ip, port, coin }) === hash &&
                  !isResendIsAllowed)
              }
            >
              <Icon style={{ marginRight: "12px" }}>send</Icon>
              Check
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  )
);
