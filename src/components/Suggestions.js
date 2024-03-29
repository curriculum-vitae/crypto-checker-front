import { Avatar, Chip, MenuItem, Paper, TextField } from "@material-ui/core";
import { compose, deburr } from "lodash/fp";
import { getLabelKey, getSuggestionLabel } from "helpers.js";
import { setDisplayName, withHandlers, withState } from "recompose";

import Downshift from "downshift";
import React from "react";
import keycode from "keycode";
import { withStyles } from "@material-ui/core/styles";

const MAX_SEARCH_RESULTS = 5000;

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

const getSuggestions = suggestions => value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? suggestions
    : suggestions.filter(suggestion => {
        const keep =
          count < MAX_SEARCH_RESULTS &&
          (suggestion.name.slice(0, inputLength).toLowerCase() === inputValue ||
            suggestion.key.slice(0, inputLength).toLowerCase() === inputValue);

        if (keep) {
          count += 1;
        }

        return keep;
      });
};

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
  suggestions
}) => (
  <Downshift
    id="coins-picker"
    initialInputValue={""}
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
      openMenu,
      clearSelection
    }) => (
      <div className={classes.container}>
        {renderInput({
          classes,

          variant: "outlined",
          fullWidth: true,
          InputProps: getInputProps({
            style: {
              caretColor: !!selectedItem ? "transparent" : undefined
            },
            onFocus: openMenu,
            startAdornment: !!selectedItem ? (
              <Chip
                key={selectedItem}
                avatar={
                  <Avatar
                    src={`/images/coin/${getLabelKey(
                      selectedItem
                    )}.png`}
                  />
                }
                tabIndex={"-1000"}
                variant={"outlined"}
                label={selectedItem}
                className={classes.chip}
                onDelete={e => {
                  clearSelection();
                }}
              />
            ) : (
              undefined
            ),
            onChange: e => setInputValue(e.target.value),
            onKeyDown: e => {
              const isSimple = keycode(e).length === 1;
              if (!!selectedItem && (isSimple || keycode(e) === "backspace")) {
                clearSelection();
              }
            }
          }),
          InputLabelProps: {
            shrink: !!selectedItem ? true : undefined
          },
          placeholder: !!selectedItem ? undefined : "Start typing to search..."
        })}
        <div {...getMenuProps()}>
          {isOpen ? (
            <Paper
              style={{
                maxHeight: "280px",
                overflowY: "scroll"
              }}
              className={classes.paper}
              square
            >
              {getSuggestions(suggestions)(inputValue2).map(
                (suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({
                      item: getSuggestionLabel(suggestion)
                    }),
                    highlightedIndex,
                    selectedItem: selectedItem2
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
  withState(
    "selectedItem",
    "setSelectedItem",
    ({ selectedItem }) => selectedItem
  ),
  withHandlers({
    onChange: ({ setInputValue, setSelectedItem, inputValue }) => item => {
      setSelectedItem(item);
      if (!!inputValue) setInputValue("");
    }
  }),
  setDisplayName("Suggestions")
)(Suggestions);
