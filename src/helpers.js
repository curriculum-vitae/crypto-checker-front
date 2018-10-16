import { find, flow } from "lodash/fp";

import { DATA_ITEMS } from "constants.js";

export const getPort = label =>
  flow(
    find(item => item.label === label),
    item => (!!item ? item.port : null)
  )(DATA_ITEMS);

export const convertFormToURL = form =>
  `http://${form.ip}/${form.port}/${form.coin}`;
