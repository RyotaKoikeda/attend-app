import { createTheme } from "@material-ui/core/styles";

// Pick colors on https://material.io/resources/color/#!/

export const theme = createTheme({
  palette: {
    primary: {
      light: "#ffcd83",
      main: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#000",
    },
    secondary: {
      light: "#e33371",
      main: "#dc004e",
      dark: "#9a0036",
      contrastText: "#000",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
  },
  breakpoints: {
    keys: ["sm", "md", "lg"],
    values: {
      sm: 440,
      md: 768,
      lg: 1280,
    },
  },
});
