import { Button, Grid, Typography } from "@material-ui/core";
import { compose, isNumber } from "lodash/fp";
import { getPort, isValidIP, isValidPort } from "helpers.js";
import { setDisplayName, withState } from "recompose";

import React from "react";
import Suggestions from "components/Suggestions";
import { TextFieldEditable } from "components/TextFieldEditable";
import { grey } from "@material-ui/core/colors";
import keycode from "keycode";

export const SubmitForm = compose(
  withState("ip", "setIP"),
  // TODO
  // @material-ui/core forces to set initial state so animation works properly
  withState("port", "setPort", ""),
  withState("coin", "setCoin"),
  withState("isPortIsManuallyEdited", "setIsPortIsManuallyEdited", false),
  setDisplayName("SubmitForm")
)(
  ({
    ip,
    port,
    coin,
    setIP,
    setPort,
    setCoin,
    onSubmit,
    isPortIsManuallyEdited,
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
            helperText={!!ip && !isValidIP(ip) ? "IP is not valid" : undefined}
          />
        </Grid>
        <Grid item xs={8} sm={9}>
          <Suggestions
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
        onClick={() => onSubmit({ ip, port, coin })}
        disabled={!port || !coin || !ip || !isValidIP(ip) || !isValidPort(port)}
      >
        Check
      </Button>
    </>
  )
);
