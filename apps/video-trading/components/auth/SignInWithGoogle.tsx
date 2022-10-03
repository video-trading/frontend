import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "../../styles/SignInWithGoogle.module.scss";

interface Props {
  onClick: () => void;
}

export default function SignInWithGoogle(props: Props) {
  return (
    <Box sx={{ cursor: "pointer" }} onClick={props.onClick}>
      <Stack
        direction={"row"}
        sx={{
          background: "#4285f4",
          width: "194px",
          boxShadow: "0 3px 4px 0 rgba(0,0,0,.25)",
          borderRadius: "2px",
        }}
        alignItems={"center"}
      >
        <Box
          sx={{ background: "white", width: "40px", height: "40px" }}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          p={"2px"}
          margin={"2px"}
        >
          <img
            style={{ width: "18px", height: "18px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </Box>
        <Typography
          fontSize={"14px"}
          letterSpacing="0.2px"
          marginLeft={"10px"}
          fontWeight="bold"
        >
          Sign in with google
        </Typography>
      </Stack>
    </Box>
  );
}
