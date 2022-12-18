// @flow
import * as React from "react";
import { GetVideoResponse } from "../../src/services/VideoService";
import { CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { UIConfig } from "../../src/UIConfig";
import { useRouter } from "next/router";

type Props = {
  video: GetVideoResponse;
};

export function VideoCard(props: Props) {
  const router = useRouter();
  return (
    <Stack
      spacing={0.5}
      sx={{ cursor: "pointer" }}
      onClick={() => router.push(`/watch?v=${props.video.id}`)}
    >
      <CardMedia
        component={"img"}
        image={props.video.thumbnail ?? UIConfig.fallbackImageUrl}
        sx={{
          height: 240,
          borderRadius: 6,
        }}
      />
      <Typography fontSize={14}>{props.video.title}</Typography>
      {/*User name*/}
      <Stack direction={"row"} spacing={1}>
        <Image
          src={"/images/user.icon.svg"}
          alt={"user"}
          width={20}
          height={20}
        />
        <Typography fontSize={14}>{props.video.User.name}</Typography>
      </Stack>
    </Stack>
  );
}
