import { Chip, Menu, MenuItem, Paper, TextField } from "@material-ui/core";
import { compose, deburr, flow } from "lodash/fp";
import {
  setDisplayName,
  withHandlers,
  withState,
  withStateHandlers
} from "recompose";

import COINS from "coins.json";
import Downshift from "downshift";
import React from "react";
import { getSuggestionLabel } from "helpers.js";
import keycode from "keycode";
import { withStyles } from "@material-ui/core/styles";

const suggestions = COINS.map(coin => ({
  key: coin[0],
  name: coin[1],
  port: coin[2]
}));

function renderInput(props) {
  const { InputProps, classes, ref, ...other } = props;

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

const Suggestions = ({
  classes,
  onSelect,
  onChange,
  inputValue,
  setInputValue,
  selectedItem,
  setSelectedItem
}) => (
  <Downshift
    id="coins-picker"
    onSelect={onSelect}
    inputValue={inputValue}
    selectedItem={selectedItem}
    onChange={onChange}
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      highlightedIndex,

      isOpen,
      inputValue: inputValue2,
      selectedItem: selectedItem2,
      openMenu
    }) => (
      <div className={classes.container}>
        {renderInput({
          fullWidth: true,
          classes,
          label: "Coin",
          variant: "outlined",
          InputProps: getInputProps({
            startAdornment: selectedItem ? (
              <Chip
                key={selectedItem}
                tabIndex={-1}
                label={selectedItem}
                className={classes.chip}
                onDelete={() => {
                  setSelectedItem(null);
                  openMenu();
                }}
              />
            ) : (
              undefined
            ),
            onFocus: openMenu,
            type: "search",
            onChange: e => setInputValue(e.target.value),
            disabled: !!selectedItem
          }),
          InputLabelProps: {
            shrink: !!selectedItem ? true : undefined
          },
          placeholder: !!selectedItem ? null : "Pick a coin"
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

export default compose(
  withStyles(styles),
  withState("inputValue", "setInputValue", ""),
  withState("selectedItem", "setSelectedItem", null),
  withHandlers({
    onChange: ({ setInputValue, setSelectedItem, selectedItem }) => item => {
      setInputValue("");
      setSelectedItem(item);
    }
  }),
  setDisplayName("Suggestions")
)(Suggestions);
