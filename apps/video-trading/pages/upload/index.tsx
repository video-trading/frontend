import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import VideoUploadDialog from "../../components/upload/VideoUploadDialog";
import { useContract } from "../../hooks/useContract";

export default function Index() {
  // store file
  const [file, setFile] = React.useState<File | undefined>();
  const [showUploadDialog, setShowUploadDialog] = React.useState(false);

  return (
    <Stack
      height={"100%"}
      width="100%"
      justifyContent="center"
      alignContent={"center"}
      alignItems="center"
    >
      <Stack justifyContent={"center"} alignItems="center" spacing={1}>
        <Image src={"/cloud.webp"} width={200} height={200} />
        <Typography variant="subtitle1">Pick A video to upload</Typography>
        <Typography variant="subtitle2">
          Your video will be private until you publish them
        </Typography>
        <Box justifyContent="center" display={"flex"} mt={5}>
          <Button variant="contained" component="label">
            Select file
            <input
              hidden
              accept="video/*"
              multiple
              type="file"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
                setShowUploadDialog(true);

                // reset file input field
                //@ts-ignore
                e.target.value = null;
              }}
            />
          </Button>
        </Box>
      </Stack>

      {file && (
        <VideoUploadDialog
          open={showUploadDialog}
          onClose={() => setShowUploadDialog(false)}
          file={file}
          uploadProgress={10}
        />
      )}
    </Stack>
  );
}
