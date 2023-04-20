import { GetServerSideProps } from "next";
import React from "react";
import { requireAuthentication } from "../../src/requireAuthentication";
import { TokenHistroy, TokenService } from "../../src/services/TokenService";
import { Container } from "@mui/system";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Chip } from "../../components/shared/Chip";

interface Props {
  history: TokenHistroy[];
}

export default function MyRewards({ history }: Props) {
  return (
    <Container>
      <h1>My Tokens</h1>
      <Stack>
        {history.map((h) => (
          <Card>
            <CardContent>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Typography variant="h5" fontWeight={"bold"}>
                  Token: {h.value}
                </Typography>
                <Chip label={h.type} />
              </Stack>
              <Typography>{h.timestamp}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    const { id } = context.query;
    const history = await TokenService.getTokenHistory(id as string);

    return {
      props: {
        history,
      },
    };
  });
