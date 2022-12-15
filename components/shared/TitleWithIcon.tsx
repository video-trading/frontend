// @flow
import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  title: string;
  icon: string;
};

export function TitleWithIcon(props: Props) {
  return (
    <Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Image src={props.icon} alt={props.title} width={40} height={40} />
        <Typography fontWeight={"bold"}>{props.title}</Typography>
      </Stack>
    </Stack>
  );
}
