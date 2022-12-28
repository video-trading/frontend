// @flow
import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
} from "@mui/material";
import { useGetTransactionsByVideo } from "../../src/hooks/useGetTransactionsByVideo";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface Props extends DialogProps {
  videoId: string;
}

export function VideoTransactionHistoryDialog(props: Props) {
  const transactions = useGetTransactionsByVideo(props.videoId);
  const router = useRouter();

  return (
    <Dialog {...props} maxWidth={"lg"}>
      <DialogTitle>Transaction History</DialogTitle>
      <DialogContent>
        {transactions.data === undefined && <LinearProgress />}
        <List>
          {transactions.data?.items.map((t) => (
            <>
              <ListItem>
                <ListItemText
                  primary={dayjs(t.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  secondary={
                    <Stack direction={"row"}>
                      <Link href={`tx/user/${t.fromId}`}>
                        {t.From.username}
                      </Link>
                      <span>→</span>
                      <Link href={`tx/user/${t.fromId}`}>{t.To.username}</Link>
                    </Stack>
                  }
                />

                <ListItemSecondaryAction>
                  <Button
                    variant={"outlined"}
                    onClick={() => router.push(`tx/${t.id}`)}
                  >
                    View
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant={"middle"} />
            </>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={(e) => {
            if (props.onClose) {
              props.onClose(e, "backdropClick");
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
