// @flow
import * as React from "react";
import { styled } from "@mui/material/styles";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import prettyBytes from "pretty-bytes";

type Props = {
  progress: number;
  title: string;
  currentUploadBytes: number;
  totalUploadBytes: number;
};

export const StyledProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 100,
  color: "#1F94FF",
  backgroundColor: "#EFF1F3",
  borderRadius: 16,
}));

export function ProgressBar(props: Props) {
  return (
    <Box position={"relative"}>
      <StyledProgressBar value={props.progress} variant={"determinate"} />
      <Stack
        direction={"row"}
        position={"absolute"}
        top={"10%"}
        left={"10%"}
        spacing={4}
      >
        <VideoLibraryIcon sx={{ height: 60, width: 60, color: "#CECECE" }} />
        <Stack justifyContent={"center"}>
          <Typography fontSize={14} color={"#CECECE"} fontWeight={"bold"}>
            {props.title}
          </Typography>
          <Typography fontSize={14} color={"#CECECE"}>
            {props.progress}% ({prettyBytes(props.currentUploadBytes)} /
            {prettyBytes(props.totalUploadBytes)})
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
