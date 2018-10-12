import { find, flow } from "lodash/fp";

import { DATA_ITEMS } from "constants.js";

export const getPort = label =>
  flow(
    find(item => item.label === label),
    item => item.port
  )(DATA_ITEMS);
