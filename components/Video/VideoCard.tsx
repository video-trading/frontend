// @flow
import * as React from "react";
import { GetVideoResponse } from "../../src/services/VideoService";
import { CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  video: GetVideoResponse;
};

export function VideoCard(props: Props) {
  return (
    <Stack spacing={0.5} sx={{ cursor: "pointer" }}>
      <CardMedia
        component={"img"}
        image={
          props.video.thumbnail ??
          "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
        }
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
        <Typography fontSize={14}>{props.video.title}</Typography>
      </Stack>
    </Stack>
  );
}
