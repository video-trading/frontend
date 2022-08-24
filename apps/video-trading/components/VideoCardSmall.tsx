import { Stack, CardMedia, Typography } from "@mui/material";
import { Video } from "client";
import dayjs from "dayjs";
import React from "react";

interface Props {
  video: Video;
}

export default function VideoCardSmall({ video }: Props) {
  return (
    <Stack direction={"row"} spacing={1}>
      <CardMedia image={video.cover} style={{ height: 100, width: 150 }} />
      <Stack>
        <Typography fontWeight={600}>{video.title}</Typography>
        <Typography color={"gray"} fontSize={"0.8rem"} fontWeight={400}>
          {video.uid}
        </Typography>
        <Typography color={"gray"} fontSize={"0.8rem"} fontWeight={400}>
          {video.views.toLocaleString("en-US")} views •{" "}
          {dayjs(video.created_at).format("MMM DD, YYYY")}
        </Typography>
      </Stack>
    </Stack>
  );
}
