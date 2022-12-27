import { GetServerSideProps } from "next";
import { TransactionService } from "../../src/services/TransactionService";
import { TransactionHistory } from "../../src/services/PaymentService";
import { Container } from "@mui/system";
import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Chip } from "../../components/shared/Chip";
import { TransactionDetailCard } from "../../components/Transaction/TransactionDetailCard";
import { useMemo } from "react";
import QrCode from "react-qr-code";

interface Props {
  transaction: TransactionHistory;
}

export default function Index({ transaction }: Props) {
  const description: { title: string; description: string }[] = useMemo(() => {
    return [
      {
        title: "From",
        description: `${transaction.fromId}`,
      },
      {
        title: "To",
        description: `${transaction.toId}`,
      },
      {
        title: "Amount",
        description: `${transaction.value}`,
      },
      {
        title: "Transaction Hash",
        description: `${transaction.txHash}`,
      },
      {
        title: "Created At",
        description: `${transaction.createdAt}`,
      },
      {
        title: "Video",
        description: `${transaction.videoId}`,
      },
    ];
  }, []);

  return (
    <Container>
      <Stack spacing={2} mt={2}>
        <Typography variant={"h4"} fontWeight={"bold"}>
          Invoice
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button>Download</Button>
        </Stack>
        <Card>
          <Stack p={5} spacing={4}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={"bold"} variant={"h5"}>
                Transaction
              </Typography>
              <Stack>
                <Chip label={"Success"} />
                <Typography fontWeight={"bold"}>{transaction.id}</Typography>
              </Stack>
            </Stack>
            <Grid container spacing={5}>
              {description.map((d, index) => (
                <Grid item xs={6}>
                  <TransactionDetailCard
                    key={index}
                    title={d.title}
                    description={d.description}
                  />
                </Grid>
              ))}
            </Grid>

            <Stack direction={"row"} justifyContent={"center"}>
              <Tooltip title={"Your invoice qrcode "}>
                <QrCode value={transaction.id} />
              </Tooltip>
            </Stack>

            <Divider />

            <Typography>
              Notes: We appreciate your business. Should you need us to add VAT
              or extra notes let us know!
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const txId = (context.params as any).id as string;
  const tx = await TransactionService.getTransactionById(txId);

  return {
    props: {
      transaction: tx,
    },
  };
};
