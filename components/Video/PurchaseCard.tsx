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
import { useTranslation } from "react-i18next";

type Props = {
  videoId: string;
  salesInfo?: SalesInfo;
  description: string;
  purchasable: boolean;
};

export function PurchaseCard({
  salesInfo,
  description,
  videoId,
  purchasable,
}: Props) {
  const router = useRouter();
  const [selectedPurchaseOption, setSelectedPurchaseOption] =
    React.useState<any>();
  const { t } = useTranslation("common");

  const purchaseFor = t("purchase_for");
  const tokens = t("tokens");
  const or = t("or");
  const purchaseOptionsText = t("purchase_options");
  const singlePurchase = t("single_purchase");
  const rentFor24Hours = t("rent_for_24_hours");
  const referralProgram = t("referral_program");

  const purchaseOptions: { title: string; description: string }[] = [
    {
      title: singlePurchase,
      description: "Purchase this video once",
    },
    {
      title: rentFor24Hours,
      description: "Rent this video for 24 hours",
    },
    {
      title: referralProgram,
      description:
        "For every purchase made through our platform, a percentage of the sale price will be paid as a royalty to the original author " +
        "of the item. This ensures that the creator of the item " +
        "is fairly compensated for their work and contribution to our community.",
    },
  ];

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
              <Typography>{purchaseOptionsText}</Typography>
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
              {purchaseFor} {salesInfo.price} HKD
            </Button>
          </Box>
        )}
        <Divider>{or}</Divider>
        {salesInfo && purchasable && (
          <Box p={2}>
            <Button
              disabled={!selectedPurchaseOption}
              fullWidth
              variant={"contained"}
              onClick={() => router.push(`purchase/token?v=${videoId}`)}
            >
              {purchaseFor} {salesInfo.price * 10} {tokens}
            </Button>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
