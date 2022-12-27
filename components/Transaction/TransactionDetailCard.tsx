// @flow
import * as React from "react";
import { Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  description: string;
};

export function TransactionDetailCard(props: Props) {
  return (
    <Stack spacing={2}>
      <Typography
        fontWeight={"700"}
        color={"rgb(145, 158, 171)"}
        textTransform={"uppercase"}
      >
        {props.title}
      </Typography>
      <Typography>{props.description}</Typography>
    </Stack>
  );
}
