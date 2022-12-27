import { Stack, Typography } from "@mui/material";
import * as React from "react";

export function DescriptionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Stack direction={"row"} alignItems={"baseline"} spacing={2}>
      <Typography variant={"h6"}>{title}</Typography>
      <Typography variant={"subtitle1"} color={"gray"}>
        {description}
      </Typography>
    </Stack>
  );
}
