// @flow
import * as React from "react";
import { useCallback, useContext } from "react";
import { Dropzone } from "../components/Upload/Dragzone";
import { GetServerSideProps } from "next";
import { requireAuthentication } from "../src/requireAuthentication";
import {
  UploadContext,
  UploadContextProvider,
} from "../src/models/UploadModel";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { GetVideoResponse, VideoService } from "../src/services/VideoService";
import { useSession } from "next-auth/react";
import { UIContext } from "../src/models/UIModel";
import { ProgressBar } from "../components/Upload/ProgressBar";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Editor } from "editor";
import Image from "next/image";

type Props = {
  uploadType: "video" | "audio";
  step: number;
  video?: GetVideoResponse;
};

function UploadStepper({ step }: { step: number }) {
  return (
    <Stepper activeStep={step}>
      <Step>
        <StepLabel>Pick Video</StepLabel>
      </Step>
      <Step>
        <StepLabel>Upload Video</StepLabel>
      </Step>
      <Step>
        <StepLabel>Finished</StepLabel>
      </Step>
    </Stepper>
  );
}

export default function Create(props: Props) {
  return (
    <UploadContextProvider>
      <Container>
        <Stack spacing={2} p={2}>
          <Typography variant="h5">Creation center</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Profile</Typography>
          </Breadcrumbs>
          {props.step === 1 && <UploadStep uploadType={props.uploadType} />}
          {props.step === 2 && <CreateVideoStep video={props.video!} />}
          {props.step === 3 && <FinishStep />}
        </Stack>
      </Container>
    </UploadContextProvider>
  );
}

interface UploadStepProps {
  uploadType: "video" | "audio";
}

export function UploadStep(props: UploadStepProps) {
  const { setFile, file, upload, setPreSignedUrl } = useContext(UploadContext);
  const [loading, setLoading] = React.useState(false);
  const { notifyError } = useContext(UIContext);
  const router = useRouter();
  const session = useSession();

  const createVideo = useCallback(
    async (file: File) => {
      if (!session) {
        return;
      }
      setLoading(true);
      try {
        setFile(file);
        const video = await VideoService.createVideo(
          (session.data as any).accessToken,
          {
            fileName: file.name,
            title: "",
            description: "",
          }
        );
        setPreSignedUrl(video.preSignedURL);
        upload(video.preSignedURL, file);
        await router.push(`/create?video=${video.video.id}&step=2`);
      } catch (e: any) {
        notifyError(e);
      }
      setLoading(false);
    },
    [session]
  );

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction={"row"} spacing={2}>
            {["video", "audio"].map((uploadType) => (
              <Button
                size={"small"}
                onClick={() => router.push(`/create?uploadType=${uploadType}`)}
                variant={
                  props.uploadType === uploadType ? "contained" : "outlined"
                }
              >
                {uploadType}
              </Button>
            ))}
          </Stack>
          <Box display={"flex"} justifyContent={"center"}>
            <Dropzone
              onFile={async (file) => {
                await createVideo(file);
              }}
              accept={"video/*"}
              file={file}
              loading={loading}
            />
          </Box>

          <Stack>
            <Stack
              direction={"row"}
              spacing={1}
              justifyItems={"center"}
              alignItems={"center"}
            >
              <Box className={"leftBlueRectangle"} />
              <Typography variant={"caption"}>TIPS:</Typography>
            </Stack>
            <Typography variant={"caption"}>
              You can upload a video by dragging and dropping it into the box
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

interface CreateVideoStep {
  video: GetVideoResponse;
}
function CreateVideoStep(props: CreateVideoStep) {
  const { uploadProgress, totalUploadBytes, currentUploadBytes } =
    useContext(UploadContext);
  const [isForSale, setIsForSale] = React.useState(false);
  const session = useSession();
  const { notifyError } = useContext(UIContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: props.video.title,
      description: props.video.description,
      SalesInfo: props.video.SalesInfo,
    },
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        await VideoService.updateVideo(
          (session.data! as any).accessToken,
          props.video.id,
          {
            ...values,
            SalesInfo: isForSale ? values.SalesInfo : undefined,
          }
        );
        router.push(`/create?video=${props.video.id}&step=3`);
      } catch (e: any) {
        notifyError(e);
      }
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <UploadStepper step={2} />
            <ProgressBar
              progress={uploadProgress * 100}
              title={props.video!.fileName ?? ""}
              currentUploadBytes={currentUploadBytes}
              totalUploadBytes={totalUploadBytes}
            />

            <form onSubmit={(e) => e.preventDefault()}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                <Typography fontWeight={"bold"}>Description</Typography>
                <Card variant={"outlined"}>
                  <Editor
                    initialValue={formik.values.description}
                    onChange={(v) => {
                      formik.setFieldValue("description", v);
                    }}
                  />
                </Card>
                <FormControl>
                  <FormLabel>
                    Is this video for sale or is it free to watch?
                  </FormLabel>
                  <RadioGroup
                    value={isForSale}
                    onChange={(e, value) => {
                      const forSale = value === "true";
                      if (!forSale) {
                        formik.setFieldValue("SalesInfo", undefined);
                      }
                      setIsForSale(forSale);
                    }}
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label={"Yes"}
                      value={"true"}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label={"No"}
                      value={"false"}
                    />
                  </RadioGroup>
                </FormControl>
                {isForSale && (
                  <TextField
                    label={"Price"}
                    value={formik.values.SalesInfo?.price ?? 0}
                    onChange={(e) => {
                      formik.setFieldValue("SalesInfo", {
                        price:
                          e.target.value.length > 0
                            ? parseFloat(e.target.value)
                            : 0,
                      });
                    }}
                  />
                )}
                <Divider />

                <Stack
                  direction={"row"}
                  justifyContent={"flex-end"}
                  alignItems={"flex-end"}
                  width={"100%"}
                >
                  <LoadingButton
                    variant={"contained"}
                    loading={formik.isSubmitting}
                    onClick={formik.submitForm}
                  >
                    Publish
                  </LoadingButton>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

function FinishStep() {
  const router = useRouter();

  return (
    <Card>
      <CardContent>
        <UploadStepper step={3} />
        <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
          <Image
            src={"/images/finish.webp"}
            alt={"Finish"}
            height={200}
            width={200}
          />
          <Typography>Your video has been published!</Typography>
          <Button onClick={() => router.push("/")}>Go to home</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    const uploadType = context.query.uploadType ?? "video";
    const step = parseInt((context.query.step as any) ?? "1");
    const videoId = (context.query.video as any) ?? null;
    let video: GetVideoResponse | null = null;

    if (videoId) {
      video = await VideoService.getVideo(videoId);
    }

    return {
      props: {
        uploadType: uploadType,
        step: step,
        video: video,
      },
    };
  });
