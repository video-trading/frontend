// @flow
import * as React from "react";
import { GetServerSideProps, NextPage } from "next";
import {
  GetVideoDetailResponse,
  VideoService,
} from "../../src/services/VideoService";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { Editor } from "editor";
import DiamondIcon from "@mui/icons-material/Diamond";
import PaidIcon from "@mui/icons-material/Paid";
import dayjs from "dayjs";
import { DescriptionTitle } from "../../components/Video/DescriptionTitle";
import { BenefitCard } from "../../components/Video/BenefitCard";
import { DropInUI } from "braintree-react";
import { useSession } from "next-auth/react";
import { useGetPaymentClientToken } from "../../src/hooks/useGetPaymentClientToken";
import { useCallback, useContext } from "react";
import { UIContext } from "../../src/models/UIModel";
import { LoadingButton } from "@mui/lab";
import { PaymentService } from "../../src/services/PaymentService";
import { useRouter } from "next/router";
import { requireAuthentication } from "../../src/requireAuthentication";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { languageMap } from "../../src/languages";

type Props = {
  video: GetVideoDetailResponse;
};

const benefits: {
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Fast Execution",
    icon: <DiamondIcon />,
    description:
      "Our platform allows for quick and efficient execution of trades",
  },
  {
    title: "Advanced Charting Tools",
    icon: <DiamondIcon />,
    description: "Our platform offers a variety of advanced charting tools",
  },
  {
    title: "Comprehensive Market Coverage",
    icon: <DiamondIcon />,
    description: "Our platform provides access to a wide range of markets",
  },
  {
    title: "Advanced Security Measures",
    icon: <DiamondIcon />,
    description: "We prioritize the security of our users' accounts ",
  },
];

const Index: NextPage<Props> = ({ video }: Props) => {
  const session = useSession();
  const { notifyError } = useContext(UIContext);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const paymentToken = useGetPaymentClientToken(
    (session.data as any)?.accessToken
  );

  const checkout = useCallback(async () => {
    const accessToken = (session.data as any)?.accessToken;

    if (!accessToken) {
      notifyError(new Error("Access token not found"));
      return;
    }
    setLoading(true);
    try {
      const transactionHistory = await PaymentService.checkoutWithToken(
        accessToken,
        video.id
      );
      await router.push(`/tx/${transactionHistory.id}`);
    } catch (e) {
      notifyError(e as any);
    }
    setLoading(false);
  }, [paymentToken, session]);

  return (
    <Container>
      <Head>
        <title>Purchase | {video.title ?? ""}</title>
      </Head>
      <DescriptionTitle
        title={"Purchase video"}
        description={"Your video is ready to be purchased"}
      />
      <Stack mt={3} p={2} spacing={2}>
        <Grid container spacing={2}>
          <Grid item md={5}>
            <CardMedia
              image={video.thumbnail}
              sx={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          </Grid>
          <Grid item md={7}>
            <Card>
              <Stack p={2}>
                <Typography variant={"h5"} fontWeight={"bold"}>
                  {video.title}
                </Typography>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography variant={"body2"}>{video.createdAt}</Typography>
                  <Divider orientation={"vertical"} flexItem />
                  <Chip label={video.Category.name} />
                  <Chip label={video.Category.parent.name} />
                </Stack>
                <Editor editable={false} initialValue={video.description} />
                <Divider />
                <Typography variant={"h6"}>Benefits you will get</Typography>
                <Grid container alignItems={"center"}>
                  {benefits.map((benefit) => (
                    <Grid item md={6} key={benefit.title}>
                      <BenefitCard
                        benefit={benefit.title}
                        description={benefit.description}
                        icon={benefit.icon}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Card>
          <CardContent>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <PaidIcon sx={{ fontSize: 50, color: "gray", opacity: 0.1 }} />
                <Stack direction={"row"} alignItems={"baseline"} spacing={2}>
                  <Typography
                    color={"#FCAA36"}
                    fontWeight={"normal"}
                    fontSize={30}
                  >
                    {(video.SalesInfo?.price ?? 0) * 10} Tokens
                  </Typography>
                  <Typography variant={"caption"} color={"gray"}>
                    Gas Fee {0.1 * (video.SalesInfo?.price ?? 0)} Tokens
                  </Typography>
                </Stack>
              </Stack>
              <Typography>
                Estimate Finished Time: {dayjs().format("YYYY-MM-DD")}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        {paymentToken.data === undefined && <LinearProgress />}
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={() => checkout()}
        >
          Confirm!
        </LoadingButton>
      </Stack>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = async (context) =>
  requireAuthentication(context, async (accessToken, user) => {
    const videoId = context.query.v as string;
    const video = await VideoService.getVideo(videoId, accessToken);
    const locale = languageMap[context.locale ?? "en"];

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        video,
      },
    };
  });
