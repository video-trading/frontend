// @flow
import * as React from "react";
import { GetServerSideProps, NextPage } from "next";
import ReactPlayer from "react-player";
import {
  GetVideoDetailResponse,
  GetVideoResponse,
  VideoService,
} from "../../src/services/VideoService";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
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

type Props = {
  video: GetVideoDetailResponse;
};

const Index: NextPage<Props> = ({ video }: Props) => {
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
              </CardContent>
            </Card>

            <Stack direction={"row"} spacing={2}>
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
                    <Button variant={"contained"}>Purchase History</Button>
                  </Stack>
                </Card>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <PurchaseCard
            salesInfo={video.SalesInfo}
            description={video.description}
            videoId={video.id}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const videoId = context.query.v as string;
  const video = await VideoService.getVideo(videoId);

  return {
    props: {
      video,
    },
  };
};
