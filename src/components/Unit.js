import {
  Icon,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import { Mutation, Subscription, withApollo } from "react-apollo";
import { blue, green, orange, red } from "@material-ui/core/colors";
import { compose, find, flow, map } from "lodash/fp";

import React from "react";
import { withState } from "recompose";

const MAP_OF_TYPES_TO_ICONS = {
  info: "info",
  warning: "warning",
  okay: "thumb_up",
  error: "cancel"
};

const MAP_OF_TYPES_TO_PALETTES = {
  info: blue,
  warning: orange,
  okay: green,
  error: red
};

export const Unit = compose(withState("isInDetail", "setIsInDetail", false))(
  ({ unit, isInDetail, setIsInDetail }) => (
    <Paper key={unit.id} elevation={1}>
      <List>
        <ListItem>
          <ListItemIcon>
            <Icon
              style={{
                color: MAP_OF_TYPES_TO_PALETTES[unit.type][500]
              }}
            >
              {MAP_OF_TYPES_TO_ICONS[unit.type]}
            </Icon>
          </ListItemIcon>
          <ListItemText primary={unit.title} secondary={unit.description} />

          {unit.details ? (
            <ListItemSecondaryAction>
              <IconButton onClick={() => setIsInDetail(!isInDetail)}>
                <Icon>
                  {isInDetail ? "keyboard_arrow_down" : "keyboard_arrow_right"}{" "}
                </Icon>
              </IconButton>
            </ListItemSecondaryAction>
          ) : null}
        </ListItem>
      </List>

      {unit.details && isInDetail ? (
        <div
          style={{
            paddingLeft: "80px",
            paddingBottom: "20px"
          }}
          dangerouslySetInnerHTML={{
            __html: unit.details
          }}
        />
      ) : null}
    </Paper>
  )
);
