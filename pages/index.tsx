import { useGetVideos } from "../src/hooks/useGetVideos";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { VideoCard } from "../components/Video/VideoCard";
import { GetServerSideProps } from "next";
import {
  CategoryService,
  GetCategoryResponse,
} from "../src/services/CategoryService";

interface Props {
  categories: GetCategoryResponse[];
}

export default function Home({ categories }: Props) {
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
            spacing={2}
            overflow={"scroll"}
          >
            {categories.map((category) => (
              <Chip
                clickable
                key={category.id}
                label={category.name}
                sx={{ fontSize: "1rem" }}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
      <Grid
        container
        spacing={2}
        columns={{ xl: 18, lg: 15, md: 9, sm: 6 }}
        px={10}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <Grid item sm={3} key={virtualRow.index}>
              {row ? <VideoCard video={row} /> : <CircularProgress />}
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categories = await CategoryService.getCategories();
  return {
    props: {
      categories,
    },
  };
};
