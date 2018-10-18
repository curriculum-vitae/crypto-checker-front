import { Menu, MenuItem, Paper, TextField } from "@material-ui/core";

import COINS from "coins.json";
import Downshift from "downshift";
import React from "react";
import deburr from "lodash/deburr";
import { getSuggestionLabel } from "helpers.js";
import { withStyles } from "@material-ui/core/styles";

const suggestions = COINS.map(coin => ({
  key: coin[0],
  name: coin[1],
  port: coin[2]
}));

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.key}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {getSuggestionLabel(suggestion)}
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;

  let count = 0;

  return inputLength === 0
    ? suggestions
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          (suggestion.name.slice(0, inputLength).toLowerCase() === inputValue ||
            suggestion.key.slice(0, inputLength).toLowerCase() === inputValue);

        if (keep) {
          count += 1;
        }
        return keep;
      });
}

const styles = theme => ({
  container: {
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 10,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },

  inputRoot: {
    width: "100%"
  },
  inputInput: {
    width: "100%"
  }
});

function IntegrationDownshift(props) {
  const { classes, onSelect } = props;

  return (
    <Downshift id="downshift-simple" onSelect={onSelect}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
        openMenu
      }) => (
        <div className={classes.container}>
          {renderInput({
            fullWidth: true,
            classes,
            label: "Coin",
            type: "search",
            variant: "outlined",
            InputProps: getInputProps({
              onFocus: openMenu,
              type: "search"
            })
          })}
          <div {...getMenuProps()}>
            {isOpen ? (
              <Paper
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll"
                }}
                className={classes.paper}
                square
              >
                {getSuggestions(inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({
                      item: getSuggestionLabel(suggestion)
                    }),
                    highlightedIndex,
                    selectedItem
                  })
                )}
              </Paper>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
}

export default withStyles(styles)(IntegrationDownshift);
