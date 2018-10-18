import { find, flow } from "lodash/fp";

import COINS from "coins.json";

export const getPort = label => {
  try {
    const match = label.match(/([\s\S]+) \(([\s\S]+)\)/);

    const key = match[2];
    const name = match[1];

    return flow(
      find(item => item[0] === key && item[1] === name),
      item => (!!item ? item[2] : null)
    )(COINS);
  } catch (e) {
    console.error("getPort exploded");
    return null;
  }
};

export const convertFormToURL = form =>
  `http://${form.ip}/${form.port}/${form.coin}`;

export const isValidIP = ip => {
  const re = `^(25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-4]|2[0-4][0-9]|[01]?[1-9][0-9]?)$`;

  const regExp = new RegExp(re);

  return regExp.test(ip);
};

export const isValidPort = port => port >= 1 && port <= 65535;

export const isUnitsFullyLoaded = find(unit => unit.status === "resolved");

export const getSuggestionLabel = suggestion => {
  return `${suggestion.name} (${suggestion.key})`;
};
