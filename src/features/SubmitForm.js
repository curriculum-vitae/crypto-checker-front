import { Button, Grid, Typography } from "@material-ui/core";

import React from "react";
import Suggestions from "components/Suggestions";
import { TextFieldEditable } from "components/TextFieldEditable";
import { flow } from "lodash/fp";
import { getPort } from "helpers.js";
import { withState } from "recompose";

export const SubmitForm = flow(
  withState("ip", "setIP"),
  // TODO
  // @material-ui/core forces to set initial state so animation works properly
  withState("port", "setPort", ""),
  withState("coin", "setCoin")
)(({ ip, port, coin, setIP, setPort, setCoin, onSubmit }) => (
  <>
    <Suggestions onSelect={item => setCoin(item)} />
    <br />
    <Grid container spacing={16}>
      <Grid item xs={8} sm={10}>
        <TextFieldEditable
          autoFocus={false}
          label={"IP"}
          fullWidth
          variant={"outlined"}
          onChange={e => setIP(e.target.value)}
        />
      </Grid>
      <Grid item xs={4} sm={2}>
        <TextFieldEditable
          label={"Port"}
          fullWidth
          variant={"outlined"}
          onChange={e => setPort(e.target.value)}
          type={"number"}
          InputProps={{
            value: port
          }}
        />
        {!!coin && port !== getPort(coin) ? (
          <Typography variant={"caption"} style={{ marginTop: "4px" }}>
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
      </Grid>
    </Grid>
    <br />
    <Button
      color={"primary"}
      variant={"contained"}
      onClick={() => onSubmit({ ip, port, coin })}
      disabled={!port || !coin || !ip}
    >
      Check
    </Button>
  </>
));
