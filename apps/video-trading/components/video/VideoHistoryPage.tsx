import {
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import useUser from "../../hooks/useUser";
import useVideoHistory from "../../hooks/useVideoHistory";

interface Props {
  video: any;
}

export default function VideoHistoryPage({ video }: Props) {
  const histories = useVideoHistory(video);

  console.log("histories", histories);

  return (
    <List>
      <Collapse in={histories.isLoading} mountOnEnter unmountOnExit>
        <LinearProgress />
      </Collapse>
      {histories.data?.map((history, index) => (
        <ListItem key={`${index}`}>
          <ListItemText
            primary={
              <Stack direction={"row"} spacing={1}>
                <TransactionText userRef={history.from} />
                <Typography>Purchased from</Typography>
                <TransactionText userRef={history.to} />
              </Stack>
            }
            secondary={`HKD  $${history.amount}`}
          />
          <ListItemSecondaryAction>
            <Typography>
              {dayjs(history.created_at.seconds * 1000).format("YYYY-MM-DD")}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

function TransactionText({ userRef }: { userRef: any }) {
  const user = useUser(userRef);

  return <Typography>{user.data?.display_name}</Typography>;
}
