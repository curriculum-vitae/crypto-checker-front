import blue from "@material-ui/core/colors/blue";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    suppressDeprecationWarnings: true,
    useNextVariants: true
  },
  palette: {
    primary: blue
  }
});
