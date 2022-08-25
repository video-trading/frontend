import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CodeVisulizationProvider } from "codevis";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  // override app bar theme
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderLeft: 0,
          borderRight: 0,
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CodeVisulizationProvider>
        <Component {...pageProps} />
      </CodeVisulizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
