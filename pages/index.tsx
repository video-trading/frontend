import { useGetVideos } from "../src/hooks/useGetVideos";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Fade,
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
import { useRouter } from "next/router";

interface Props {
  categories: GetCategoryResponse[];
  categoryId: string;
}

export default function Home({ categories, categoryId }: Props) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetVideos(categoryId);

  const parentRef = useRef(null);
  const router = useRouter();

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
                variant={categoryId === category.id ? "filled" : "outlined"}
                onClick={() => router.push(`/?categoryId=${category.id}`)}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
      <Fade in={isFetching} timeout={{ exit: 1000 }}>
        <Stack
          alignContent={"center"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Stack>
      </Fade>
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
  const category = context.query.categoryId ?? "";

  return {
    props: {
      categories: [{ id: "", name: "All" } as any, ...categories],
      categoryId: category as string,
    },
  };
};
