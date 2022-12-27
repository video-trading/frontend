import { GetServerSideProps } from "next";
import { TransactionService } from "../../../src/services/TransactionService";
import { TransactionHistory } from "../../../src/services/PaymentService";
import { Container } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Pagination,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Chip } from "../../../components/shared/Chip";
import { TransactionDetailCard } from "../../../components/Transaction/TransactionDetailCard";
import { useMemo } from "react";
import QrCode from "react-qr-code";
import { PaginationResponse } from "../../../src/services/VideoService";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  transactions: PaginationResponse<TransactionHistory>;
  user: string;
}

export default function Index({ transactions, user }: Props) {
  return (
    <Container>
      <List>
        <Typography variant={"h5"} mb={5}>
          Transactions by user {user}
        </Typography>
        <Pagination />
        {transactions.items.map((transaction) => (
          <Card sx={{ mb: 5 }}>
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={transaction.id}
                  secondary={dayjs(transaction.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                />
                <ListItemSecondaryAction>
                  <Link href={`/tx/${transaction.id}`}>
                    <Button>View</Button>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const userId = (context.params as any).id as string;
  const tx = await TransactionService.getTransactionsByUserId(userId);

  return {
    props: {
      transactions: tx,
      user: userId,
    },
  };
};
