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
import { useTranslation } from "react-i18next";

interface Props extends DialogProps {
  videoId: string;
}

export function VideoTransactionHistoryDialog(props: Props) {
  const transactions = useGetTransactionsByVideo(props.videoId);
  const router = useRouter();
  const { t } = useTranslation("common");
  const purchaseHistory = t("purchase_history");

  return (
    <Dialog {...props} maxWidth={"lg"}>
      <DialogTitle>{purchaseHistory}</DialogTitle>
      <DialogContent>
        {transactions.data === undefined && <LinearProgress />}
        <List>
          {transactions.data?.items.map((t) => (
            <div key={t.id}>
              <ListItem>
                <ListItemText
                  primary={dayjs(t.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  secondary={
                    <Stack direction={"row"}>
                      <Link href={`tx/user/${t.fromId}`}>
                        {t.From.username}
                      </Link>
                      <span>→</span>
                      <Link href={`tx/user/${t.toId}`}>{t.To.username}</Link>
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
            </div>
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
