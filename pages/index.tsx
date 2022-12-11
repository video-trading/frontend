import { useGetVideos } from "../src/hooks/useGetVideos";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { debug } from "util";
import { VideoCard } from "../components/Video/VideoCard";

export default function Home() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetVideos();

  const parentRef = useRef(null);

  const rows = data ? data.pages.flatMap((page) => page.items) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 100,
    overscan: 10,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    rows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);
  const theme = useTheme();

  return (
    <Stack spacing={2} ref={parentRef}>
      <Box position={"sticky"} top={64}>
        <Paper
          elevation={0}
          sx={{
            background: (
              theme.components?.MuiAppBar?.styleOverrides?.root as any
            )?.backgroundColor,
          }}
        >
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            p={1}
          >
            <Chip label={"All"} />
          </Stack>
        </Paper>
      </Box>
      <Grid container spacing={2} columns={{ lg: 15 }} px={10}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <Grid item lg={3} key={virtualRow.index}>
              {row ? <VideoCard video={row} /> : <CircularProgress />}
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
