import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  data: string[];
}

export default function Cards({ data }: Props) {
  return (
    <div className="container py-8" id="projects">
      <h2 className="text-2xl font-bold mb-6">Supported Langages </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-1 md:col-span-2 lg:col-span-3">
        {data.map((d) => (
          <Card key={d}>
            <CardContent>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignContent="center"
                height={"100%"}
                width="100%"
              >
                <Typography variant="h6" textTransform={"capitalize"}>
                  {d}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
