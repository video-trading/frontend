import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Breadcrumbs,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import {
  AuthenticationService,
  Profile,
} from "../../src/services/AuthenticationService";
import { requireAuthentication } from "../../src/requireAuthentication";
import { useCallback, useContext, useRef, useState } from "react";
import { AvatarService } from "../../src/services/AvatarService";
import { useSession } from "next-auth/react";
import { UIContext } from "../../src/models/UIModel";
import { StorageService } from "../../src/services/StorageService";
import { UserService } from "../../src/services/UserService";
import QRCode from "react-qr-code";
import { Editor } from "editor";

interface Props {
  user: Profile;
}

export default function Index(props: Props) {
  const formik = useFormik({
    initialValues: {
      ...props.user,
      avatar: props.user.avatar?.key,
    },
    onSubmit: async (values) => {
      try {
        await UserService.update(
          (session.data as any).accessToken,
          values as Profile
        );
        notify("Profile updated", "success");
      } catch (e: any) {
        notifyError(e);
      }
    },
  });
  const [avatar, setAvatar] = useState<string | undefined>(
    props.user.avatar?.url
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const avatarFilePickerRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const { notify, notifyError } = useContext(UIContext);

  const generateAvatar = useCallback(async () => {
    if (session.status !== "authenticated") {
      return;
    }

    setIsGeneratingAvatar(true);
    try {
      const avatar = await AvatarService.generateAvatar(
        (session.data as any).accessToken
      );
      setAvatar(avatar.url);
      await formik.setFieldValue("avatar", avatar.key);
    } catch (e) {
      notify(`${e}`, "error");
    }
    setIsGeneratingAvatar(false);
  }, [props.user, session]);

  const uploadAvatar = useCallback(
    async (e: any) => {
      if (session.status !== "authenticated") {
        return;
      }

      setIsUploading(true);
      try {
        const signedUrl = await AvatarService.createPreSignedAvatarUploadUrl(
          (session.data as any).accessToken
        );

        const file = e.target.files[0];
        await StorageService.uploadUsingPreSignedUrl(signedUrl, file);
        notify("Avatar uploaded successfully", "success");
        setAvatar(signedUrl.previewUrl);
        await formik.setFieldValue("avatar", signedUrl.key);
      } catch (e) {
        notify(`${e}`, "error");
      }
      setIsUploading(false);
    },
    [session]
  );

  return (
    <Container>
      <Stack pt={2} spacing={2}>
        <Typography variant="h5">Profile</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Profile</Typography>
        </Breadcrumbs>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Card>
                <CardContent>
                  <Stack spacing={2} p={2}>
                    <Box
                      display={"flex"}
                      justifyContent="center"
                      position={"relative"}
                    >
                      <Stack direction={"row"}>
                        <Tooltip title="Upload avatar">
                          <>
                            <Avatar
                              src={avatar}
                              sx={{
                                width: 120,
                                height: 120,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                (avatarFilePickerRef.current as any)?.click();
                              }}
                            />
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              ref={avatarFilePickerRef}
                              onChange={uploadAvatar}
                            />
                          </>
                        </Tooltip>
                      </Stack>
                      {isUploading && (
                        <Box position={"absolute"} top={"35%"} right={"44%"}>
                          <CircularProgress color={"secondary"} />
                        </Box>
                      )}
                    </Box>
                    <TextField
                      label="Name"
                      name="name"
                      placeholder="name"
                      onChange={formik.handleChange}
                      value={formik.values.name ?? ""}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      placeholder="email"
                      onChange={formik.handleChange}
                      value={formik.values.email ?? ""}
                    />
                    <TextField
                      multiline={true}
                      rows={4}
                      label="Short Bio"
                      name="shortDescription"
                      placeholder="shortDescription"
                      onChange={formik.handleChange}
                      value={formik.values.shortDescription ?? ""}
                    />

                    <Box
                      flex={1}
                      alignItems={"center"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <Tooltip
                        title={`Wallet Address: ${props.user.Wallet.address}`}
                      >
                        <QRCode size={200} value={props.user.Wallet.address} />
                      </Tooltip>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={8}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction={"row"} spacing={2}></Stack>
                    <Typography variant="subtitle2" fontWeight={"bold"}>
                      Bio
                    </Typography>
                    <Card
                      variant="outlined"
                      elevation={0}
                      sx={{ boxShadow: "none", p: 1 }}
                    >
                      <Stack spacing={1}>
                        <Box height={550}>
                          <Editor
                            initialValue={formik.values.longDescription}
                            onChange={(value) =>
                              formik.setFieldValue("longDescription", value)
                            }
                          />
                        </Box>
                        <Divider />
                      </Stack>
                    </Card>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent="flex-end"
                    p={1}
                    mt={3}
                  >
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={formik.isSubmitting}
                    >
                      Save Profile
                    </LoadingButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    const profile = await AuthenticationService.profile(accessToken);
    return {
      props: {
        user: profile,
      },
    };
  });
