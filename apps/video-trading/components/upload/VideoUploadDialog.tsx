import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Video } from "client";
import Image from "next/image";
import React from "react";
import { abbreviateNumber } from "utils";
import LinearProgressWithLabel from "../LinearProgressWithLabel";

import CloseIcon from "@mui/icons-material/Close";

import VideoUploadContractPanel from "./VideoUploadContractPanel";

interface Props extends DialogProps {
  /**
   * Uploaded video.
   */
  video?: Video;
  /**
   * File to upload.
   */
  file?: File;
  /**
   * Upload progress. Between 0 and 100.
   */
  uploadProgress?: number;
}

export default function VideoUploadDialog(props: Props) {
  const { open, onClose } = props;
  const [step, setStep] = React.useState(0);

  const fileName = React.useMemo(() => {
    const { file, video } = props;

    if (file) {
      return file.name;
    }

    if (video) {
      return video.title;
    }
    return "Error";
  }, [props.video, props.file]);

  const fileSize = React.useMemo(() => {
    const { file, video } = props;
    if (file) {
      return file.size;
    }

    if (video) {
      return 0;
    }
    return 0;
  }, [props.video, props.file]);

  const canNext = React.useMemo(() => {
    return true;
  }, []);

  const detail = () => (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        {/* Left details */}
        <Grid item xs={7}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Details
            </Typography>
            <TextField label="Title" placeholder="Your video's title" />
            <TextField
              label="Description"
              placeholder="Your video's description"
              multiline
              rows={5}
            />
            <Autocomplete
              multiple
              id="tags-filled"
              options={["hello world"]}
              defaultValue={["hello world"]}
              freeSolo
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Tags" placeholder="Video Chips" />
              )}
            />
            <Typography variant="h6" fontWeight={600}>
              Thumbnails
            </Typography>
            <Typography>Upload a thumbnail to represent your video</Typography>
            <Box display={"flex"}>
              <Button>Upload your cover</Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <Stack spacing={2}>
            <Box>
              <Card>
                <Box position={"relative"} width="100%" height={200}>
                  <Image src="/cloud.webp" layout="fill" objectFit="contain" />
                </Box>
                <CardContent>
                  {props.uploadProgress !== undefined && (
                    <LinearProgressWithLabel value={props.uploadProgress} />
                  )}
                  <List>
                    <ListItem>
                      <ListItemText primary="File Name" secondary={fileName} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Resolution"
                        secondary={"1920x1080"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="File Size"
                        secondary={`${abbreviateNumber(fileSize)}B`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );

  const check = () => (
    <Stack>
      <Typography variant="h6" fontWeight={600}>
        Check
      </Typography>
      <Typography maxWidth={"60%"} variant="subtitle2">
        We will check your video for issues that may restrict its visibility and
        then you will have the opportunity to fix issues before publishing your
        video
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Video Upload status"
            secondary={
              props.uploadProgress !== undefined ? "Uploading" : "Ready"
            }
          />
          <ListItemSecondaryAction>
            {props.uploadProgress !== undefined && (
              <CircularProgress size={20} />
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Stack>
  );

  return (
    <Dialog open={open} fullWidth maxWidth={"lg"}>
      <DialogTitle>
        <Stack direction={"row"} justifyContent="space-between">
          <Typography variant="h6">
            {fileName} - {abbreviateNumber(fileSize)}
          </Typography>
          <Box>
            <IconButton
              onClick={(e) => {
                if (onClose !== undefined) {
                  onClose(e, "escapeKeyDown");
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Stepper style={{ marginBottom: 20 }} activeStep={step}>
          <Step key={0}>
            <StepLabel>Details</StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Checks</StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>Contract</StepLabel>
          </Step>
        </Stepper>
        {step === 0 && detail()}
        {step === 1 && check()}
        {step === 2 && <VideoUploadContractPanel />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setStep(step - 1)}>Previous</Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!canNext}
          onClick={() => setStep(step + 1)}
        >
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}
