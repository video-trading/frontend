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
  purchasable: boolean;
};

const purchaseOptions: { title: string; description: string }[] = [
  {
    title: "Single Purchase",
    description: "Purchase this video once",
  },
  {
    title: "Rent for 24 hours",
    description: "Rent this video for 24 hours",
  },
  {
    title: "Referral program",
    description:
      "For every purchase made through our platform, a percentage of the sale price will be paid as a royalty to the original author " +
      "of the item. This ensures that the creator of the item " +
      "is fairly compensated for their work and contribution to our community.",
  },
];

export function PurchaseCard({
  salesInfo,
  description,
  videoId,
  purchasable,
}: Props) {
  const router = useRouter();
  const [selectedPurchaseOption, setSelectedPurchaseOption] =
    React.useState<any>();

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
        {salesInfo && purchasable && (
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box flex={2}>
              <Typography>Purchase options</Typography>
            </Box>
            <Box flex={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Option</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant={"standard"}
                >
                  {purchaseOptions.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={index}
                      onClick={() => setSelectedPurchaseOption(option)}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        )}

        {salesInfo && purchasable && (
          <Typography variant={"subtitle2"} color={"gray"}>
            {selectedPurchaseOption?.description}
          </Typography>
        )}
        {salesInfo && purchasable && (
          <Box p={2}>
            <Button
              disabled={!selectedPurchaseOption}
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
