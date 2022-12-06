// @flow
import * as React from "react";
import { Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { AuthenticationService } from "../../src/services/AuthenticationService";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UIContext } from "../../src/models/UIModel";

type Props = {
  mode: "signup" | "signin";
};

export function AuthenticationForm({ mode }: Props) {
  const router = useRouter();
  const { notify } = useContext(UIContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
    onSubmit: async (values) => {
      if (mode === "signin") {
        const result = await signIn("credentials", {
          redirect: false,
          username: values.username,
          password: values.password,
        });
        if (result?.error) {
          notify(result?.error, "error");
          return;
        }
        await router.push("/");
      } else {
        const result = await AuthenticationService.signUp(
          values.username,
          values.password,
          values.name,
          values.email
        );

        if (result?.error) {
          notify(result?.error, "error");
          return;
        }
        await router.push("/user/signin");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack p={4} minWidth={500} spacing={4}>
        {mode === "signup" && (
          <Stack direction={"row"} spacing={1}>
            <Box flex={1}>
              <TextField
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Box flex={1}>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Box>
          </Stack>
        )}

        <TextField
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <LoadingButton
          loading={formik.isSubmitting}
          onClick={formik.submitForm}
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </LoadingButton>
      </Stack>
    </form>
  );
}
