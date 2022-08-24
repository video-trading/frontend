import { Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  icon: React.ReactElement;
}

export default function VideoButton({ icon, title }: Props) {
  return (
    <Stack direction={"row"} spacing={2}>
      {icon}
      <Typography>{title}</Typography>
    </Stack>
  );
}
