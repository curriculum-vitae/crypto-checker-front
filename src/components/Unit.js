import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import { blue, green, orange, red } from "@material-ui/core/colors";

import React from "react";
import { compose } from "lodash/fp";
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
