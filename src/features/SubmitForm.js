import { Button, Grid, Typography } from "@material-ui/core";
import { getPort, isValidIP, isValidPort, convertFormToURL } from "helpers.js";
import { setDisplayName, withState, defaultProps } from "recompose";

import React from "react";
import Suggestions from "components/Suggestions";
import { TextFieldEditable } from "components/TextFieldEditable";
import { compose } from "lodash/fp";
import { grey } from "@material-ui/core/colors";
import keycode from "keycode";

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
    <>
      <br />
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <TextFieldEditable
            autoFocus={false}
            label={"IP"}
            fullWidth
            variant={"outlined"}
            onChange={e => setIP(e.target.value)}
            error={!!ip && !isValidIP(ip)}
            value={ip}
            helperText={!!ip && !isValidIP(ip) ? "IP is not valid" : undefined}
          />
        </Grid>
        <Grid item xs={8} sm={9}>
          <Suggestions
            selectedItem={coin}
            onSelect={coin => {
              setCoin(coin);
              if (!isPortIsManuallyEdited && coin && !!getPort(coin)) {
                setPort(getPort(coin));
              }
              if (!coin && !isPortIsManuallyEdited) setPort("");
            }}
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <TextFieldEditable
            label={"Port"}
            fullWidth
            value={port}
            variant={"outlined"}
            onChange={e => {
              const value = e.target.value;
              if (parseInt(value, 10) <= 0) return;
              setPort(value);
              setIsPortIsManuallyEdited(true);
            }}
            onKeyDown={e => {
              if (keycode(e) !== "tab") setIsPortIsManuallyEdited(true);
            }}
            type={"number"}
            inputProps={{
              style: {
                color: isPortIsManuallyEdited ? undefined : grey[600]
              }
            }}
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
              value: port
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Button
        color={"primary"}
        variant={"contained"}
        onClick={() => {
          setHash(convertFormToURL({ ip, port, coin }));
          onSubmit({ ip, port, coin });
        }}
        disabled={
          !port ||
          !coin ||
          !ip ||
          !isValidIP(ip) ||
          !isValidPort(port) ||
          (convertFormToURL({ ip, port, coin }) === hash && !isResendIsAllowed)
        }
      >
        Check
      </Button>
    </>
  )
);
