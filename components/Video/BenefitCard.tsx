import * as React from "react";
import { Stack, Typography } from "@mui/material";

export function BenefitCard({
  benefit,
  description,
  icon,
}: {
  benefit: string;
  icon: React.ReactNode;
  description?: string;
}) {
  return (
    <Stack p={2} direction={"row"} alignItems={"center"} spacing={2}>
      {icon}
      <Stack>
        <Typography variant={"subtitle1"}>{benefit}</Typography>
        <Typography variant={"subtitle2"}>{description}</Typography>
      </Stack>
    </Stack>
  );
}
