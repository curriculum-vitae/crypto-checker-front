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
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line
} from "recharts";
import React from "react";
import Measure from "react-measure";
import { compose, flow, map } from "lodash/fp";
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

export const Unit = compose(
  withState("isInDetail", "setIsInDetail", false),
  withState("dimensions", "setDimension", {
    width: -1,
    height: -1
  })
)(({ unit, isInDetail, setIsInDetail, dimensions, setDimension }) => (
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

    {unit.graph ? (
      <Measure
        bounds
        onResize={contentRect => {
          setDimension(contentRect.bounds);
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            style={{
              width: "100%"
            }}
          >
            <LineChart
              width={dimensions.width}
              height={200}
              data={flow(
                unit => JSON.parse(unit.graph),
                map(point => ({
                  time: point[0],
                  pings: point[1]
                }))
              )(unit)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey={"time"} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="pings"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
        )}
      </Measure>
    ) : null}
  </Paper>
));
