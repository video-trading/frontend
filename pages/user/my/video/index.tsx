// @flow
import * as React from "react";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import { TitleWithIcon } from "../../../../components/shared/TitleWithIcon";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../../../../src/requireAuthentication";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useGetMyVideos } from "../../../../src/hooks/useGetMyVideos";
import { useSession } from "next-auth/react";
import { GetMyVideoDto } from "../../../../src/services/VideoService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";
import Head from "next/head";

type Props = {};

export default function Index(props: Props) {
  const session = useSession();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetMyVideos((session.data as any)?.accessToken);

  const parentRef = useRef(null);

  const rows = data ? data.pages.flatMap((page) => page.items) : [];
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => 100,
    overscan: 10,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    rows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <Container>
      <Head>
        <title>My Videos</title>
      </Head>
      <Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={10}>
          <TitleWithIcon title={"My Video"} icon={"/images/history.icon.svg"} />
          <Fade
            in={isFetching}
            timeout={{ exit: 1000 }}
            mountOnEnter
            unmountOnExit
          >
            <CircularProgress size={20} />
          </Fade>
        </Stack>

        <Timeline
          ref={parentRef}
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {rowVirtualizer.getVirtualItems().map((row, index) => {
            const item = rows[row.index];
            return (
              <TimelineItem key={item._id}>
                <TimelineOppositeContent color="textSecondary">
                  {item._id}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={"primary"}>
                    <PersonalVideoIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <VideoCard _id={item._id} videos={item.videos} />
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Stack>
    </Container>
  );
}

function VideoCard({ videos }: GetMyVideoDto) {
  const ref = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: videos.length,
    getScrollElement: () => ref.current!,
    estimateSize: () => 100,
    overscan: 10,
  });

  return (
    <Card variant={"outlined"}>
      <CardContent>
        <List>
          {rowVirtualizer.getVirtualItems().map((row) => {
            const video = videos[row.index];
            return (
              <div key={video.id}>
                <ListItem>
                  <CardMedia
                    component={"img"}
                    image={
                      video.thumbnail ??
                      "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                    }
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: 6,
                      marginRight: 5,
                    }}
                  />

                  <ListItemText
                    primary={video.title}
                    secondary={
                      <Stack direction={"row"} spacing={2}>
                        <Typography>Status {video.status}</Typography>
                        {video.progress < 100 ? (
                          <Tooltip
                            title={`Video process progress: ${video.progress}`}
                          >
                            <CircularProgress
                              value={video.progress}
                              variant={"determinate"}
                              size={20}
                            />
                          </Tooltip>
                        ) : (
                          <CheckCircleIcon sx={{ color: "green" }} />
                        )}
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Link href={`/user/my/video/${video.id}`}>
                      <Typography>View</Typography>
                    </Link>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant={"inset"} />
              </div>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    return {
      props: {},
    };
  });
