import { GetServerSideProps } from "next";
import { TransactionService } from "../../../src/services/TransactionService";
import { TransactionHistory } from "../../../src/services/PaymentService";
import { Container } from "@mui/system";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
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
  console.log(transactions);

  return (
    <Container>
      <List>
        <Typography variant={"h5"} mb={5}>
          Transactions by user {user}
        </Typography>
        <Pagination sx={{ marginBottom: 5 }} />
        {transactions.items.map((transaction) => (
          <Card sx={{ mb: 5 }}>
            <CardContent>
              <ListItem>
                <ListItemAvatar>
                  <CardMedia
                    image={transaction.Video?.thumbnail}
                    sx={{ width: 150, height: 100, mr: 2, borderRadius: 5 }}
                  />
                </ListItemAvatar>
                <Stack>
                  <Box width={100}>
                    <Chip label={transaction.type} />
                  </Box>
                  <Typography variant={"h6"} fontWeight={"bold"}>
                    {transaction.Video?.title}
                  </Typography>
                  <Typography variant={"body2"} color={"text.secondary"}>
                    {transaction.id}
                  </Typography>
                  <Typography variant={"body2"} color={"text.secondary"}>
                    {dayjs(transaction.createdAt).format("DD/MM/YYYY")}
                  </Typography>
                </Stack>
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
