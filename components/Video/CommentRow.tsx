// @flow
import * as React from "react";
import { Profile } from "../../src/services/AuthenticationService";
import { Avatar, Stack, Typography } from "@mui/material";

type Props = {
  user: Profile;
  content: string;
  createdAt: string;
};

export function CommentRow({ user, content, createdAt }: Props) {
  return (
    <Stack direction={"row"} spacing={2} p={4}>
      <Avatar>{user.avatar?.url}</Avatar>
      <Stack spacing={1}>
        <Typography variant={"h6"} color={"primary"}>
          {user.name}
        </Typography>
        <Typography variant={"body2"}>{content}</Typography>
        <Typography variant={"body2"} color={"gray"}>
          {createdAt}
        </Typography>
      </Stack>
    </Stack>
  );
}
