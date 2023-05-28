"use client";

import { PaymentService } from "@/src/services/PaymentService";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import ContainedButton from "../shared/ContainedButton";
import LoadingButton from "../shared/LoadingButton";
import { AuthenticationService } from "@/src/services/AuthenticationService";

interface Props {
  username: string;
  accessToken: string;
  videoId: string;
}

export default function TokenPaymentCard({
  accessToken,
  videoId,
  username,
}: Props) {
  const { t } = useTranslation("tx");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onClick = useCallback(async () => {
    try {
      setLoading(true);
      await AuthenticationService.mfaVerification({
        accessKey: accessToken,
        username,
      });

      // const result = await PaymentService.checkoutWithToken(
      //   accessToken,
      //   videoId
      // );
      // router.push(`/tx/${result.id}`);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }, [accessToken, videoId]);

  return (
    <LoadingButton
      onClick={onClick}
      loading={loading}
      disabled={loading}
      className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-1"
    >
      {t("pay-with-token")}
    </LoadingButton>
  );
}
