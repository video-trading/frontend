import {
  CardActionArea,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Video } from "client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import CategoryCard from "../components/CategoryCard";
import useVideos from "../hooks/useVideos";
import dayjs from "dayjs";

const Home: NextPage = () => {
  const router = useRouter();
  const videos = useVideos();

  return (
    <div>
      <CategoryCard useCard={true} keywords={[]} />
      <Grid container spacing={5} p={3}>
        {videos.map((video, index) => (
          <Grid item xs={3} key={`video-${index}`}>
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
                  {dayjs(video.created_at.seconds * 1000).format("YYYY-MM-DD")}
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
