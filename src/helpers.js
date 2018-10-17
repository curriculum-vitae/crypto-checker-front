import { find, flow } from "lodash/fp";

import COINS from "coins.json";
import { DATA_ITEMS } from "constants.js";

export const getPort = label => {
  const key = label.split(" / ")[0];
  const name = label.split(" / ")[1];

  return flow(
    find(item => item[0] === key && item[1] === name),
    item => (!!item ? item[2] : null)
  )(COINS);
};

export const convertFormToURL = form =>
  `http://${form.ip}/${form.port}/${form.coin}`;
