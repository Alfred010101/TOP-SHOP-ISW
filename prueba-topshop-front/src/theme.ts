// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e88e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fdd835",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

export default theme;
