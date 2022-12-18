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
  Alert,
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
import {
  GetVideoResponse,
  VideoService,
  VideoStatus,
} from "../src/services/VideoService";
import { useSession } from "next-auth/react";
import { UIContext } from "../src/models/UIModel";
import { ProgressBar } from "../components/Upload/ProgressBar";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Editor } from "editor";
import Image from "next/image";
import TreeSelect from "mui-tree-select";
import {
  CategoryNode,
  CategoryService,
  GetCategoryResponse,
} from "../src/services/CategoryService";

type Props = {
  uploadType: "video" | "audio";
  step: number;
  video?: GetVideoResponse;
  categories: GetCategoryResponse[];
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
          {props.step === 2 && (
            <CreateVideoStep
              video={props.video!}
              categories={props.categories}
            />
          )}
          {props.step === 3 && <FinishStep video={props.video!} />}
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
        upload(
          (session.data as any).accessToken,
          video.video.id,
          video.preSignedURL,
          file
        );
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
                key={uploadType}
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
  categories: GetCategoryResponse[];
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
      categoryId: props.video.categoryId,
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.categoryId) {
        errors.categoryId = "Category is required";
      }

      console.log(errors);
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await VideoService.publishVideo(
          (session.data! as any).accessToken,
          props.video.id,
          {
            ...values,
            SalesInfo: isForSale ? values.SalesInfo : undefined,
          }
        );
        await router.push(`/create?video=${props.video.id}&step=3`);
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
            {Object.entries(formik.errors).map(([key, value]) => (
              <Alert severity={"error"} key={key}>
                {`${value}`}
              </Alert>
            ))}
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  required
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                <Typography fontWeight={"bold"}>Description</Typography>
                <Card variant={"outlined"} sx={{ boxShadow: "none" }}>
                  <Box height={400} maxHeight={400}>
                    <Editor
                      initialValue={formik.values.description}
                      onChange={(v) => {
                        formik.setFieldValue("description", v);
                      }}
                      editable={true}
                    />
                  </Box>
                </Card>
                <Typography fontWeight={"bold"}>Category</Typography>
                <TreeSelect
                  getChildren={(node: CategoryNode | null) => {
                    if (node !== null) {
                      return node.subCategories;
                    }
                    return CategoryService.getCategoriesTree(props.categories);
                  }}
                  getParent={(node) => node.parent}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Category"}
                      helperText={"Select a category"}
                    />
                  )}
                  getOptionLabel={(node) => node.name}
                  onChange={(e, v) => {
                    formik.setFieldValue("categoryId", v?.id);
                  }}
                />

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
interface FinishStepProps {
  video: GetVideoResponse;
}

function FinishStep({ video }: FinishStepProps) {
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
          <Button onClick={() => router.push(`/user/my/video/${video.id}`)}>
            Check video status here
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    const uploadType = context.query.uploadType ?? "video";
    let step = parseInt((context.query.step as any) ?? "1");
    const videoId = (context.query.video as any) ?? null;
    let video: GetVideoResponse | null = null;

    if (videoId) {
      video = await VideoService.getVideo(videoId);
      if (
        video.status === VideoStatus.UPLOADING ||
        video.status === VideoStatus.UPLOADED
      ) {
        step = 2;
      } else {
        step = 3;
      }
    }

    const categories = await CategoryService.getCategories();

    return {
      props: {
        uploadType: uploadType,
        step: step,
        video: video,
        categories: categories,
      },
    };
  });
