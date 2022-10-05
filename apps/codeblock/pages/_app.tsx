import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CodeVisulizationProvider } from "codevis";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import Head from "next/head";

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
    <div>
      <Head>
        <title>CodeBlock Demo</title>
      </Head>
      <CodeVisulizationProvider>
        <Component {...pageProps} />
      </CodeVisulizationProvider>
    </div>
  );
}

export default MyApp;
