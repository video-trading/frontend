// @flow
import * as React from "react";
import { SalesInfo } from "../../src/services/VideoService";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Editor } from "editor";
import { useRouter } from "next/router";

type Props = {
  videoId: string;
  salesInfo?: SalesInfo;
  description: string;
};

export function PurchaseCard({ salesInfo, description, videoId }: Props) {
  const router = useRouter();

  return (
    <Card>
      <Stack spacing={2} p={1}>
        <Typography fontWeight={"bold"}>Description</Typography>
        <Editor initialValue={description} editable={false} />
        {salesInfo && (
          <Divider
            variant={"inset"}
            sx={{
              border: "dashed",
              borderColor: "rgba(145, 158, 171, 0.24)",
              borderWidth: "0px 0px thin",
            }}
          />
        )}
        {salesInfo && (
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box flex={2}>
              <Typography>Purchase options</Typography>
            </Box>
            <Box flex={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Option</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Single time purchase</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        )}

        {salesInfo && (
          <Typography variant={"subtitle2"} color={"gray"}>
            This will purchase the video for once{" "}
          </Typography>
        )}
        {salesInfo && (
          <Box p={2}>
            <Button
              fullWidth
              variant={"contained"}
              onClick={() => router.push(`purchase?v=${videoId}`)}
            >
              Purchase for {salesInfo.price} HKD
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
