// @flow
import * as React from "react";
import { CardActionArea, CardActions, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  title: string;
  description: string;

  link?: string;
};

export function TransactionDetailCard(props: Props) {
  const router = useRouter();

  const body = (
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

  if (props.link) {
    return (
      <CardActionArea onClick={() => router.push(props.link!)}>
        {body}
      </CardActionArea>
    );
  }

  return body;
}
