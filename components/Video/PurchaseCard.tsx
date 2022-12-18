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

type Props = {
  salesInfo?: SalesInfo;
  description: string;
};

export function PurchaseCard({ salesInfo, description }: Props) {
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
            <Button fullWidth variant={"contained"}>
              Purchase for
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
