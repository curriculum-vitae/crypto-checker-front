import { Button, Grid, Typography } from "@material-ui/core";
import { getPort, isValidIP, isValidPort } from "helpers.js";
import { setDisplayName, withState } from "recompose";

import React from "react";
import Suggestions from "components/Suggestions";
import { TextFieldEditable } from "components/TextFieldEditable";
import { compose } from "lodash/fp";

export const SubmitForm = compose(
  withState("ip", "setIP"),
  // TODO
  // @material-ui/core forces to set initial state so animation works properly
  withState("port", "setPort", ""),
  withState("coin", "setCoin"),
  setDisplayName("SubmitForm")
)(({ ip, port, coin, setIP, setPort, setCoin, onSubmit }) => (
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
          error={!!ip & !isValidIP(ip)}
          helperText={!!ip && !isValidIP(ip) ? "IP is not valid" : undefined}
        />
      </Grid>
      <Grid item xs={8} sm={9}>
        <Suggestions onSelect={item => setCoin(item)} />
      </Grid>
      <Grid item xs={4} sm={3}>
        <TextFieldEditable
          label={"Port"}
          fullWidth
          variant={"outlined"}
          onChange={e => setPort(e.target.value)}
          type={"number"}
          error={!!port & !isValidPort(port)}
          helperText={
            <>
              {!!port && !isValidPort(port) ? (
                "Port range is 1 - 65535"
              ) : !!coin && port !== getPort(coin) ? (
                <Typography variant={"caption"} gutterBottom>
                  Suggestion:
                  <u
                    style={{
                      marginLeft: "4px",
                      cursor: "pointer"
                    }}
                    onClick={() => setPort(getPort(coin))}
                  >
                    {getPort(coin)}
                  </u>
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
));
