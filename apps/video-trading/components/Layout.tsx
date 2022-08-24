import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import {
  Avatar,
  createTheme,
  IconButton,
  ListSubheader,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { appBarHeight, drawerWidth } from "../config";
import SearchField from "./SearchField";
import { useRouter } from "next/router";

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

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  link?: string;
}

interface DividerProps {
  isDivider: boolean;
  title?: string;
}

type Menu = MenuItem | DividerProps;

const menuItems: Menu[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    link: "/",
  },
  {
    label: "Explore",
    icon: <ExploreIcon />,
  },
  {
    label: "Subscriptions",
    icon: <SubscriptionsIcon />,
  },
  {
    isDivider: true,
  },
  {
    label: "Library",
    icon: <VideoLibraryIcon />,
  },
  {
    label: "History",
    icon: <HistoryIcon />,
  },
  {
    label: "Your videos",
    icon: <OndemandVideoIcon />,
  },
  {
    isDivider: true,
    title: "Subscriptions",
  },
  {
    isDivider: true,
  },
  {
    label: "Settings",
    icon: <SettingsIcon />,
  },
];

export default function Layout(props: any) {
  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderLeft: 0,
            borderRight: 0,
            height: appBarHeight,
          }}
          elevation={0}
          variant="outlined"
        >
          <Toolbar>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems={["center", "flex-start"]}
              spacing={10}
              width="100%"
            >
              <Typography variant="h6" noWrap component="div">
                Video Trading
              </Typography>
              <SearchField />

              <Stack direction={"row"} spacing={2}>
                <IconButton onClick={() => router.push("/upload")}>
                  <FileUploadIcon />
                </IconButton>
                <Avatar>A</Avatar>
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item, index) =>
                (item as DividerProps).isDivider ? (
                  <div key={`menu-${index}`}>
                    <Divider key={index} />
                    {(item as DividerProps).title && (
                      <ListSubheader>
                        {(item as DividerProps).title}
                      </ListSubheader>
                    )}
                  </div>
                ) : (
                  <ListItem key={`menu-${index}`} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if ((item as MenuItem).link) {
                          router.push((item as MenuItem).link!);
                        }
                      }}
                    >
                      <ListItemIcon>{(item as MenuItem).icon}</ListItemIcon>
                      <ListItemText primary={(item as MenuItem).label} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, height: `calc(100vh - ${appBarHeight}px)` }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
