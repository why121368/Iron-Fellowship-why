import { TypeBackground, colors, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    fontFamilyTitle: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    fontFamilyTitle: string;
  }

  interface TypeBackground {
    background: TypeBackground["default"];
  }
}

export const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#52525b",
      main: "#3f3f46",
      dark: "#27272a",
    },
    secondary: {
      main: "#ff6584",
    },
    success: {
      light: "#10b981",
      main: "#059669",
      dark: "#047857",
    },
    error: {
      light: "#ef4444",
      main: "#dc2626",
      dark: "#b91c1c",
    },
    background: {
      paper: "#fff",
      default: "#f4f4f5",
      background: "#e4e4e7",
    },
    grey: {
      [50]: "#fafafa",
      [100]: "#f4f4f5",
      [200]: "#e4e4e7",
      [300]: "#d4d4d8",
      [400]: "#a1a1aa",
      [500]: "#71717a",
      [600]: "#52525b",
      [700]: "#3f3f46",
      [800]: "#27272a",
      [900]: "#18181b",
      A100: "#f4f4f5",
      A200: "#e4e4e7",
      A400: "#a1a1aa",
      A700: "#3f3f46",
    },
  },
  typography: {
    fontFamily: [
      "RubikVariable",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  fontFamilyTitle: [
    "Staatliches",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  shape: {
    borderRadius: 2,
  },
});
