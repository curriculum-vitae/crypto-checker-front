import { find, flow } from "lodash/fp";
import { COINS } from "constants.js";

export const getLabelKey = label => {
  const match = label.match(/([\s\S]+) \(([\s\S]+)\)/);
  const key = match[2];
  return key;
};

export const getLabelName = label => {
  const match = label.match(/([\s\S]+) \(([\s\S]+)\)/);
  const name = match[1];
  return name;
};

export const getPort = label => {
  try {
    const key = getLabelKey(label);
    return flow(
      find(item => item[0] === key),
      item => (!!item ? item[2] : null)
    )(COINS);
  } catch (e) {
    console.error("getPort exploded");
    return null;
  }
};

export const convertFormToURL = form =>
  `${getLabelKey(form.coin)}://${form.ip}:${form.port}`;

export const isValidIP = ip => {
  return /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?)$/.test(ip||"");
};

export const isValidPort = port => {
  const num = parseInt(port);
  return num >= 1 && num <= 65535 && parseInt(port) === parseFloat(port);
};

export const isUnitsFullyLoaded = units =>
  !!find(unit => unit.status === "resolved")(units);

export const getSuggestionLabel = suggestion => {
  return `${suggestion.name} (${suggestion.key})`;
};

export const isValidEmail = string => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !!re.test(String(string).toLowerCase());
};
