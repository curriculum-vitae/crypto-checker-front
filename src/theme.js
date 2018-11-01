import { blue, grey, purple, orange } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    suppressDeprecationWarnings: true,
    useNextVariants: true
  },
  palette: {
    primary: grey,
    secondary: orange
  },
  shape: {
    borderRadius: 6
  }
});
