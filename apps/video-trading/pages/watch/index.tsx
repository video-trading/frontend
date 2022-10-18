import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { abbreviateNumber } from "utils";
import { Player } from "video-react";

import ShareIcon from "@mui/icons-material/Share";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import "video-react/dist/video-react.css";
import CategoryCard from "../../components/CategoryCard";
import VideoButton from "../../components/VideoButton";
import useUser from "../../hooks/useUser";
import useVideo from "../../hooks/useVideo";
import useComents from "../../hooks/useComents";
import VideoHistoryPage from "../../components/video/VideoHistoryPage";
import { useState } from "react";
import { doc, getFirestore } from "firebase/firestore";

export default function Index() {
  const router = useRouter();
  // get video id from url
  const videoId = router.query.v;
  const video = useVideo(videoId as string);
  const user = useUser(video.data?.owner as string);
  const comments = useComents(video.data as any);
  const [openVideoHistory, setOpenVideoHistory] = useState(false);

  return (
    <Grid container style={{ height: "100%" }} p={2} spacing={2}>
      {/* left sidebar */}
      <Grid item xs={8} style={{ height: "100%" }}>
        <Stack height={"100%"} spacing={2}>
          {/* video */}
          <Box>
            {video.data && (
              <Player
                fluid={false}
                poster={video.data.cover}
                src={video.data.video}
                height={500}
                //@ts-ignore
                width={"100%"}
              />
            )}
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {video.data?.title}
          </Typography>
          {/* video info */}
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography color={"gray"} fontSize={"1rem"} fontWeight={400}>
              0 views •{" "}
              {dayjs(video.data?.created_at.seconds * 1000).format(
                "MMM DD, YYYY"
              )}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <VideoButton
                title={abbreviateNumber(10000)}
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
              <Typography>{user.data?.display_name}</Typography>
              <Typography fontSize={"0.8rem"} color="gray">
                12K subscribers
              </Typography>
              <Typography mt={2}>{video.data?.description}</Typography>
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
          <Divider />
          <CardActionArea
            onClick={() => {
              setOpenVideoHistory(true);
            }}
          >
            <Box p={2}>
              <Typography fontWeight={600}>
                Show video trading history
              </Typography>
            </Box>
          </CardActionArea>
          <Divider />
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
          {comments.data?.map((comment: any) => (
            <Stack direction={"row"} spacing={1} key={comment.content}>
              <Avatar>A</Avatar>
              <Stack>
                <Stack direction={"row"} alignItems="center" spacing={1}>
                  <Typography>User name</Typography>
                  <Typography color={"gray"} fontSize={"0.8rem"}>
                    {dayjs(comment.created_at.seconds * 1000).format("MMM DD")}
                  </Typography>
                </Stack>
                <Typography>{comment.content}</Typography>
                <Stack mt={1} direction="row" spacing={2}>
                  <VideoButton icon={<ThumbUpIcon />} title="252" />
                  <VideoButton icon={<ThumbDownIcon />} title="252" />
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Grid>
      {/* right sidebar */}
      <Grid item xs={4}>
        <Stack spacing={1}>
          <Card>
            <CardHeader title="Purchase this video" />
            <CardContent>
              <Stack spacing={2}>
                <Button variant="contained">
                  Purchase for HKD ${video.data?.price}
                </Button>
              </Stack>
            </CardContent>
          </Card>
          <CategoryCard useCard={false} keywords={video.data?.tags ?? []} />
          {/* {Array(100)
            .fill(1)
            .map((_, i) => (
              <VideoCardSmall video={video} key={`video-${i}`} />
            ))} */}
        </Stack>
      </Grid>

      {video.data && (
        <Dialog
          fullWidth
          open={openVideoHistory}
          onClose={() => setOpenVideoHistory(false)}
        >
          <DialogTitle>Video trading history</DialogTitle>
          <DialogContent>
            <VideoHistoryPage
              video={doc(getFirestore(), "Video", video.data.id)}
            />
          </DialogContent>
        </Dialog>
      )}
    </Grid>
  );
}
