// @flow
import * as React from "react";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../../../../src/requireAuthentication";
import {
  GetMyVideoByIdDto,
  VideoService,
} from "../../../../src/services/VideoService";
import {
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { UIConfig } from "../../../../src/UIConfig";
import { useFormik } from "formik";
import { Editor } from "editor";
import { TitleWithIcon } from "../../../../components/shared/TitleWithIcon";
import { Chip } from "../../../../components/shared/Chip";
import { orange } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGetMyVideoDetail } from "../../../../src/hooks/useGetMyVideoDetail";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  video: GetMyVideoByIdDto;
};

export default function Detail({ video: initialVideo }: Props) {
  const formik = useFormik({
    initialValues: {
      ...initialVideo,
    },
    onSubmit: async (values) => {},
  });

  const session = useSession();

  const { data: video, isFetching } = useGetMyVideoDetail(
    initialVideo.id,
    (session.data as any)?.accessToken,
    initialVideo
  );

  useEffect(() => {
    // update analyzing data in the formik
    if (video) {
      formik.setValues(video);
    }
  }, [video]);

  if (video === undefined || video === null) {
    return (
      <Container maxWidth="md">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Grid container mt={2} spacing={2}>
        <Grid item lg={5}>
          <Card>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              p={2}
              spacing={2}
            >
              <Stack
                direction={"row"}
                width={"100%"}
                px={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <TitleWithIcon
                  title={"General Info"}
                  icon={"/images/info.svg"}
                />
                <Chip label={video.status} />
              </Stack>
              <CardMedia
                component={"div"}
                image={initialVideo.thumbnail ?? UIConfig.fallbackImageUrl}
                sx={{
                  height: 300,
                  width: "90%",
                  borderRadius: 6,
                  m: 3,
                }}
              />
              <TextField
                fullWidth
                label={"Title"}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                label={"Length"}
                value={formik.values.analyzingResult?.length ?? "No result"}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Seconds</InputAdornment>
                  ),
                }}
                disabled
              />
              <TextField
                fullWidth
                label={"Quality"}
                value={formik.values.analyzingResult?.quality ?? "No result"}
                onChange={formik.handleChange}
                disabled
              />

              <TextField
                fullWidth
                label={"Frame Rate"}
                value={formik.values.analyzingResult?.frameRate ?? "No result"}
                onChange={formik.handleChange}
                disabled
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item lg={7}>
          <Card>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              p={2}
              spacing={2}
            >
              <Stack
                direction={"row"}
                width={"100%"}
                px={2}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <TitleWithIcon
                  title={"Transcoding Info"}
                  icon={"/images/video.svg"}
                />
                {video.progress < 100 ? (
                  <Tooltip
                    title={`Video progress: ${Math.ceil(video.progress)}%`}
                  >
                    <CircularProgress
                      value={video.progress}
                      variant={"determinate"}
                      size={20}
                    />
                  </Tooltip>
                ) : (
                  <CheckCircleIcon color={"success"} />
                )}
              </Stack>

              <Grid container spacing={2}>
                {video.transcodings.length === 0 && (
                  <Stack p={3}>
                    <Typography>No transcoding</Typography>
                  </Stack>
                )}

                {video.transcodings.map((transcoding) => (
                  <Grid item md={4} lg={3} key={transcoding.id}>
                    <Card variant={"outlined"} sx={{ boxShadow: "none" }}>
                      <Stack
                        p={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Chip
                          label={transcoding.status}
                          backgroundColor={
                            transcoding.status === "COMPLETED"
                              ? undefined
                              : orange.A400
                          }
                          textColor={
                            transcoding.status === "COMPLETED"
                              ? undefined
                              : "white"
                          }
                        />
                        <Typography variant={"h6"}>
                          {transcoding.targetQuality}
                        </Typography>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Divider flexItem />
              <Stack direction={"row"} width={"100%"} px={2}>
                <TitleWithIcon
                  title={"Description"}
                  icon={"/images/description.svg"}
                />
              </Stack>
              <Card
                variant={"outlined"}
                sx={{ boxShadow: "none", height: 400 }}
              >
                <Editor initialValue={video.description} editable={true} />
              </Card>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    const id = (context.params as any).id;
    const video = await VideoService.getMyVideoById(accessToken, id);
    return {
      props: {
        video,
      },
    };
  });
