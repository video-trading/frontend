import {
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { Video } from "client";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import CategoryCard from "../components/CategoryCard";
import { useRouter } from "next/router";

const videos: Video[] = Array(100)
  .fill(1)
  .map(() => ({
    id: "1",
    title: "Video 1",
    description: "This is a video",
    cover:
      "https://assets.xboxservices.com/assets/8c/bf/8cbfa53c-96c4-42e1-9aa0-290cc166033c.jpg?n=XGP-2022_Small-tout-0_12-17-21_1067x600.jpg",
    source: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
    created_at: new Date(),
    updated_at: new Date(),
    uid: "1",
    cid: "1",
    views: 3000,
    likes: 3000,
    size: 200 * 1024 * 1024,
  }));

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <CategoryCard useCard={true} />
      <Grid container spacing={5} p={3}>
        {videos.map((video) => (
          <Grid item xs={3}>
            <Stack>
              <CardActionArea
                onClick={() => router.push(`/watch?v=${video.id}`)}
              >
                <CardMedia
                  src={video.cover}
                  component="img"
                  height={200}
                  width={600}
                />
                <Typography>{video.title}</Typography>
                <Typography variant="subtitle2" color={"gray"}>
                  {video.uid}
                </Typography>
              </CardActionArea>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
