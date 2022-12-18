// @flow
import * as React from "react";
import { Stack, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

type Props = {
  title: string;
  icon: any;
};

export function VideoIcon(props: Props) {
  // assign properties to props.icon

  const icon = React.cloneElement(props.icon, {
    sx: {
      width: 30,
      height: 30,
    },
  });

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      {icon}
      <Typography>{props.title}</Typography>
    </Stack>
  );
}
