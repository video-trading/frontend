import { Box, Fade, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  /**
   * Percentage of the progress bar. Between 0 and 100.
   */
  value?: number;
}

export default function LinearProgressWithLabel({ value }: Props) {
  return (
    <Stack
      direction={"row"}
      alignContent="center"
      justifyContent={"center"}
      alignItems="center"
      spacing={2}
    >
      <Box flex={4} width="100%">
        <LinearProgress
          value={value}
          variant={value !== undefined ? "determinate" : "indeterminate"}
        />
      </Box>
      <Fade in={value !== undefined} mountOnEnter unmountOnExit>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {value} %
          </Typography>
        </Box>
      </Fade>
    </Stack>
  );
}
