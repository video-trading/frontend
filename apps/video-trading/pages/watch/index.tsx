import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Video } from "client";
import { abbreviateNumber } from "utils";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import React from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import VideoButton from "../../components/VideoButton";
import ShareIcon from "@mui/icons-material/Share";
import CategoryCard from "../../components/CategoryCard";
import VideoCardSmall from "../../components/VideoCardSmall";
import { appBarHeight } from "../../config";

const video: Video = {
  id: "1",
  title: "Video 1",
  description: "This is a video",
  cover:
    "https://img.freepik.com/free-photo/cloud-sky-twilight-times_74190-4017.jpg?w=2000",
  source: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
  created_at: new Date(),
  updated_at: new Date(),
  size: 200 * 1024 * 1024,
  uid: "1",
  cid: "1",
  views: 3000,
  likes: 3000,
};

export default function Index() {
  const router = useRouter();
  // get video id from url
  const videoId = router.query.v;

  return (
    <Grid container style={{ height: "100%" }} p={2} spacing={2}>
      {/* left sidebar */}
      <Grid item xs={8} style={{ height: "100%" }}>
        <Stack height={"100%"} spacing={2}>
          {/* video */}
          <Box>
            <CardMedia
              image={video.cover}
              component={"div"}
              style={{ height: 640, width: "100%", backgroundSize: "cover" }}
            />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {video.title}
          </Typography>
          {/* video info */}
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography color={"gray"} fontSize={"1rem"} fontWeight={400}>
              {video.views.toLocaleString("en-US")} views •{" "}
              {dayjs(video.created_at).format("MMM DD, YYYY")}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <VideoButton
                title={abbreviateNumber(video.likes)}
                icon={<ThumbUpIcon />}
              />
              <VideoButton title={"Dislike"} icon={<ThumbDownIcon />} />
              <VideoButton title={"Share"} icon={<ShareIcon />} />
            </Stack>
          </Stack>
          <Divider />
          {/* user info */}
          <Stack direction={"row"} spacing={2}>
            {/* avatar */}
            <Avatar>A</Avatar>
            {/* description */}
            <Stack flex={2}>
              <Typography>User name</Typography>
              <Typography fontSize={"0.8rem"} color="gray">
                12K subscribers
              </Typography>
              <Typography mt={2}>
                Recorded live at Reactathon 2022. Learn more at
                https://reactathon.com Goodbye, useEffect
              </Typography>
            </Stack>
            {/* subscribe */}
            <Box>
              <Button variant="contained" color="error">
                Subscribe
              </Button>
            </Box>
          </Stack>
          <Divider />
          <Box>
            <Typography variant="h6" fontWeight={600}>
              100 Comments
            </Typography>
          </Box>
          {/* add comment */}
          <Box>
            <Card sx={{ borderRadius: 5 }}>
              <Box p={3}>
                <Stack direction={"row"} spacing={2}>
                  <Avatar>A</Avatar>
                  <Stack flex={2}>
                    <TextField variant="standard" placeholder="Add a comment" />
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Box>
          {/* comments */}
          <Stack direction={"row"} spacing={1}>
            <Avatar>A</Avatar>
            <Stack>
              <Stack direction={"row"} alignItems="center" spacing={1}>
                <Typography>User name</Typography>
                <Typography color={"gray"} fontSize={"0.8rem"}>
                  12 months ago
                </Typography>
              </Stack>
              <Typography>
                This is a comment. This is a comment. This is a comment. This is
                a comment. This is a comment. This is a comment. This is a
                comment. This is a comment. This is a comment. This is a
                comment. This is a comment. This is a comment. This is a
                comment. This is a comment.
              </Typography>
              <Stack mt={1} direction="row" spacing={2}>
                <VideoButton icon={<ThumbUpIcon />} title="252" />
                <VideoButton icon={<ThumbDownIcon />} title="252" />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      {/* right sidebar */}
      <Grid item xs={4}>
        <Stack spacing={1}>
          <Card>
            <CardHeader title="Purchase this video" />
            <CardContent>
              <Stack spacing={2}>
                <Button variant="contained">Purchase for $10</Button>
                <Divider>OR</Divider>
                <Button variant="contained">Purchase for 10 Coin</Button>
              </Stack>
            </CardContent>
          </Card>
          <CategoryCard useCard={false} />
          {Array(100)
            .fill(1)
            .map((_, i) => (
              <VideoCardSmall video={video} />
            ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
