import { HttpLink } from "apollo-link-http";

import { URL_LINK_HTTP } from "constants.js";

export default new HttpLink({
  uri: URL_LINK_HTTP
});
