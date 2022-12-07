// @flow
import * as React from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthenticationForm } from "../../components/Auth/AuthenticationForm";
import Link from "next/link";

type Props = {};

export default function Signup(props: Props) {
  return (
    <Grid container>
      <Grid item xs={8}>
        <CardMedia
          component={"div"}
          image={"/images/sign-in.jpg"}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          height={"calc(100vh - 64px)"}
        >
          <Typography fontWeight={"bold"} variant={"h5"}>
            Sign Up
          </Typography>
          <AuthenticationForm mode={"signup"} />
          <Stack alignItems={"flex-end"}>
            <Link href={"/user/signin"}>
              <Button>Switch to sign in</Button>
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
