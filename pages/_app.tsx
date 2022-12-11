import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { menus } from "../src/Menus";
import { actions } from "../src/Action";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { UIContext, UIContextProvider } from "../src/models/UIModel";
import "editor/src/style.css";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "rgb(255, 255, 255, 1)",
          boxShadow: "none",
          height: 64,
          transition:
            "width 200ms cubic-beizer(0.4, 0, 0.2, 1) 0ms, height 200ms cubic-beizer(0.4, 0, 0.2, 1) 0ms",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "8px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          [`& fieldset`]: {
            borderRadius: 16,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <SessionProvider session={(pageProps as any).session}>
          <UIContextProvider>
            <ThemeProvider theme={theme}>
              <Layout menus={menus} actions={actions}>
                <Component {...pageProps} />
                <CssBaseline />
                <ReactQueryDevtools initialIsOpen={false} />
              </Layout>
            </ThemeProvider>
          </UIContextProvider>
        </SessionProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
