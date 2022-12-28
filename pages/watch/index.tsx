// @flow
import * as React from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  GetVideoDetailResponse,
  VideoService,
} from "../../src/services/VideoService";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Chip } from "../../components/shared/Chip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { VideoIcon } from "../../components/Video/VideoIcon";
import StarIcon from "@mui/icons-material/Star";
import ReplyIcon from "@mui/icons-material/Reply";
import { PurchaseCard } from "../../components/Video/PurchaseCard";
import { VideoPlayer } from "player";
import Head from "next/head";

import CreateIcon from "@mui/icons-material/Create";
import WalletIcon from "@mui/icons-material/Wallet";
import ChatIcon from "@mui/icons-material/Chat";
import { CommentRow } from "../../components/Video/CommentRow";
import { VideoTransactionHistoryDialog } from "../../components/Video/VideoTransactionHistoryDialog";
import { requireAuthentication } from "../../src/requireAuthentication";
import { AuthenticationService } from "../../src/services/AuthenticationService";
import { optionalAuthentication } from "../../src/optionalAuthentication";

type Props = {
  video: GetVideoDetailResponse;
};

const Index: NextPage<Props> = ({ video }: Props) => {
  const [showTransactionHistory, setShowTransactionHistory] =
    React.useState(false);
  return (
    <Container>
      <Head>
        <title>Watch | {video.title}</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={1}>
            <VideoPlayer
              options={{
                controls: true,
                aspectRatio: "8:5",
                fluid: true,
              }}
              onReady={(player) => {}}
              transcoding={video.transcodings.map((t) => ({
                label: t.targetQuality,
                src: t.url,
              }))}
            />
            <Card>
              <CardContent>
                <Typography fontWeight={"bold"}>{video.title}</Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Typography variant={"caption"}>
                    {dayjs(video.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography>
                  <Chip label={video.Category.name} />
                </Stack>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <CreateIcon />
                  <Tooltip title={"Creator"}>
                    <Typography variant={"caption"}>
                      {video.Owner.username}
                    </Typography>
                  </Tooltip>
                  <Divider orientation={"vertical"} flexItem />
                  <WalletIcon />
                  <Tooltip title={"Owner"}>
                    <Typography variant={"caption"}>
                      {video.User.username}
                    </Typography>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>

            <Stack direction={"row"} spacing={2} height={100}>
              <Box flex={1}>
                <Card>
                  <Box p={2} height={90}>
                    <VideoIcon
                      title={video.likes.toString()}
                      icon={<ThumbUpIcon />}
                    />
                  </Box>
                </Card>
              </Box>
              <Box flex={1}>
                <Card>
                  <Box p={2} height={90}>
                    <VideoIcon
                      title={video.likes.toString()}
                      icon={<StarIcon />}
                    />
                  </Box>
                </Card>
              </Box>
              <Box flex={1}>
                <Card>
                  <Box p={2} height={90}>
                    <VideoIcon
                      title={video.likes.toString()}
                      icon={<ReplyIcon />}
                    />
                  </Box>
                </Card>
              </Box>
              <Box flex={3} height={200}>
                <Card>
                  <Stack p={2} direction={"row"} height={90}>
                    <Button
                      variant={"contained"}
                      onClick={() => setShowTransactionHistory(true)}
                    >
                      Purchase History
                    </Button>
                  </Stack>
                </Card>
              </Box>
            </Stack>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <ChatIcon />
              <Typography variant={"h6"}>Comments</Typography>
            </Stack>
            <Card>
              <CardContent>
                <Stack direction={"row"}>
                  <TextField fullWidth />
                  <Button>Send</Button>
                </Stack>
              </CardContent>
            </Card>
            <CommentRow
              user={video.Owner}
              content={"Hello"}
              createdAt={dayjs().format("YYYY-MM-DD HH:mm:ss")}
            />
            <Divider />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <PurchaseCard
            purchasable={video.purchasable}
            salesInfo={video.SalesInfo}
            description={video.description}
            videoId={video.id}
          />
        </Grid>
      </Grid>

      <VideoTransactionHistoryDialog
        videoId={video.id}
        open={showTransactionHistory}
        onClose={() => setShowTransactionHistory(false)}
        fullWidth
      />
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  optionalAuthentication(context, async (accessToken, user) => {
    const videoId = context.query.v as string;
    const video = await VideoService.getVideo(videoId, accessToken);

    return {
      props: {
        video,
      },
    };
  });
