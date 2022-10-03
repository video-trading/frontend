import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useFormik } from "formik";
import React, { useState } from "react";
import SignInWithGoogle from "../../components/auth/SignInWithGoogle";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import { AuthenticationMode } from "../../lib/constants/AuthenticationMode";
import { LoadingButton } from "@mui/lab";

const SignIn: NextPage = () => {
  const [mode, setMode] = useState(AuthenticationMode.SignIn);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (mode === AuthenticationMode.SignIn) {
        const { error } = await supabaseClient.auth.signIn({
          email: values.email,
          password: values.password,
        });
        if (error) {
          alert(error.message);
        }
      }

      if (mode === AuthenticationMode.SignUp) {
        const { error } = await supabaseClient.auth.signUp({
          email: values.email,
          password: values.password,
        });
        if (error) {
          alert(error.message);
        }
        alert("Check your email for the confirmation link");
      }
      setLoading(false);
    },
  });

  return (
    <Container>
      <Stack
        justifyContent={"center"}
        justifyItems={"center"}
        alignItems={"center"}
        p={2}
        spacing={2}
        sx={{ height: "calc(100vh - 64px)" }}
      >
        <Card>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Stack p={2} spacing={2} width="600px">
                <Stack direction={"row"} justifyContent="space-between">
                  <Typography variant="h6">
                    Sign {mode === AuthenticationMode.SignIn ? "in" : "up"} to
                    Video Trading Platform
                  </Typography>
                  <Tooltip
                    title={
                      mode === AuthenticationMode.SignIn
                        ? "Switch to sign up"
                        : "Switch to sign in"
                    }
                  >
                    <IconButton
                      onClick={() => {
                        setMode(
                          mode === AuthenticationMode.SignUp
                            ? AuthenticationMode.SignIn
                            : AuthenticationMode.SignUp
                        );
                      }}
                    >
                      <CameraswitchIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <TextField
                  label="email"
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  type="email"
                />
                <TextField
                  label="password"
                  value={formik.values.password}
                  name="password"
                  onChange={formik.handleChange}
                  type="password"
                />
                <Stack
                  justifyContent={"center"}
                  alignItems="center"
                  spacing={1}
                >
                  <Stack
                    width={"100%"}
                    justifyItems={"flex-end"}
                    alignItems="flex-end"
                  >
                    <Box>
                      <LoadingButton type="submit" loading={loading}>
                        Sign {mode === AuthenticationMode.SignIn ? "in" : "up"}
                      </LoadingButton>
                    </Box>
                  </Stack>
                  <Divider flexItem>OR</Divider>
                  <SignInWithGoogle
                    onClick={() =>
                      supabaseClient.auth.signIn({ provider: "google" })
                    }
                  />
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default SignIn;
