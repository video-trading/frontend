import { useDropzone } from "react-dropzone";
import * as React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

type DropzoneProps = {
  file?: File;
  onFile: (file: File) => void;
  accept: string;
  loading: boolean;
};

export function Dropzone(props: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => props.onFile(acceptedFiles[0]),
  });
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div
      {...getRootProps()}
      style={{
        width: "100%",
        height: 400,
        border: "1px dashed rgba(145, 158, 171, 0.32)",
        cursor: "pointer",
        borderRadius: 16,
      }}
      onClick={() => {
        ref.current?.click();
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        width={"100%"}
        position={"relative"}
      >
        <Box>
          <Typography>
            {props.file ? props.file.name : "Drag file here or click to upload"}
          </Typography>
        </Box>
        {props.loading && (
          <Box
            position={"absolute"}
            right={"50%"}
            top={"48%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <input {...getInputProps()} ref={ref} accept={props.accept} />
    </div>
  );
}
