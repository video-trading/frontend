// @flow
import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { AuthenticationForm } from "../../components/Auth/AuthenticationForm";
import Link from "next/link";
import Image from "next/image";

type Props = {};

export default function Signin(props: Props) {
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
            Sign In
          </Typography>
          <AuthenticationForm mode={"signin"} />
          <Stack alignItems={"flex-end"}>
            <Link href={"/user/signup"}>
              <Button>Switch to sign up</Button>
            </Link>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
